import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, db, checkQuotaExceeded } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  email: string | null;
  name?: string;
  phone?: string;
  phoneNumber?: string;
  phoneVerified?: boolean;
  provider?: string;
  role?: string;
  profileCompleted?: boolean;
  welcomeEmailSent?: boolean;
}

interface AuthState {
  user: UserProfile | null;
  isAdmin: boolean;
  isCompliant: boolean;
  loading: boolean;
  accessToken: string | null;
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => {
      let isListening = false;
      const ADMIN_EMAILS = [
        'webhub2811@gmail.com',
        'prime.elitestore02@gmail.com',
        'primeelitestore02@gmail.com'
      ];

      const initializeAuthListener = () => {
        if (isListening) return;
        isListening = true;

        onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            // Keep existing persisted state to avoid flicker while verifying DB
            if (!get().user) {
              set({ loading: true });
            }
            
            let profileRetries = 1;
            let success = false;
            
            const isAdmin = ADMIN_EMAILS.includes((firebaseUser.email || '').toLowerCase().trim());

            while (profileRetries > 0 && !success) {
              try {
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                if (userDoc.exists()) {
                  const data = userDoc.data();
                  const phone = data.phone || data.phoneNumber || '';
                  const role = isAdmin ? 'admin' : (data.role || 'customer');
                  const profileCompleted = isAdmin ? true : (data.profileCompleted || (!!phone ? true : false));
                  const welcomeEmailSent = data.welcomeEmailSent || false;
                  set({
                    user: {
                      uid: firebaseUser.uid,
                      email: firebaseUser.email,
                      name: data.name || firebaseUser.displayName || 'Customer',
                      phone,
                      phoneNumber: data.phoneNumber || data.phone || '',
                      phoneVerified: data.phoneVerified || false,
                      provider: data.provider || (firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email'),
                      role,
                      profileCompleted,
                      welcomeEmailSent,
                    },
                    isAdmin,
                    isCompliant: isAdmin || (!!phone && profileCompleted),
                    loading: false,
                  });
                } else {
                  set({
                    user: {
                      uid: firebaseUser.uid,
                      email: firebaseUser.email,
                      name: firebaseUser.displayName || 'Customer',
                      phone: firebaseUser.phoneNumber || '',
                      phoneNumber: firebaseUser.phoneNumber || '',
                      phoneVerified: false,
                      provider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
                      role: isAdmin ? 'admin' : 'customer',
                      profileCompleted: isAdmin ? true : false,
                      welcomeEmailSent: false,
                    },
                    isAdmin,
                    isCompliant: isAdmin, // Only true initially for admins, false for customer until they do profile-completion
                    loading: false,
                  });
                }
                success = true;
              } catch (error: any) {
                checkQuotaExceeded(error);
                const isOffline = error?.message?.toLowerCase().includes('offline') || error?.toString().toLowerCase().includes('offline');
                
                if (isOffline) {
                  console.warn('[AuthStore] Client is offline. Proceeding with fallback user profile immediately.');
                  set({
                    user: {
                      uid: firebaseUser.uid,
                      email: firebaseUser.email,
                      name: firebaseUser.displayName || 'Customer',
                      phone: firebaseUser.phoneNumber || '',
                      phoneNumber: firebaseUser.phoneNumber || '',
                      phoneVerified: false,
                      provider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
                      role: isAdmin ? 'admin' : 'customer',
                      profileCompleted: isAdmin ? true : false,
                      welcomeEmailSent: false,
                    },
                    isAdmin,
                    isCompliant: isAdmin,
                    loading: false,
                  });
                  success = true;
                } else {
                  console.error(`Error loading user profile (Attempts left: ${profileRetries - 1}):`, error);
                  profileRetries--;
                  
                  if (profileRetries === 0) {
                    set({
                      user: {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        name: firebaseUser.displayName || 'Customer',
                        phone: firebaseUser.phoneNumber || '',
                        phoneNumber: firebaseUser.phoneNumber || '',
                        phoneVerified: false,
                        provider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
                        role: isAdmin ? 'admin' : 'customer',
                        profileCompleted: isAdmin ? true : false,
                        welcomeEmailSent: false,
                      },
                      isAdmin,
                      isCompliant: isAdmin,
                      loading: false,
                    });
                  } else {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                  }
                }
              }
            }
          } else {
            set({ user: null, isAdmin: false, isCompliant: true, loading: false });
          }
        });
      };

      // Trigger registration immediately
      initializeAuthListener();

      return {
        user: null,
        isAdmin: false,
        isCompliant: true,
        loading: true,
        accessToken: null,
        setUser: (user) => set({ user }),
        setLoading: (loading) => set({ loading }),
        setAccessToken: (accessToken) => set({ accessToken }),
        logout: async () => {
          try {
            set({ loading: true });
            await auth.signOut();
            if (typeof window !== 'undefined') {
              window.localStorage.removeItem('firebase:authTransientState');
              window.localStorage.removeItem('prime-auth-storage');
              try {
                window.sessionStorage.clear();
              } catch (_) {}
            }
            set({ user: null, accessToken: null, isAdmin: false, isCompliant: true, loading: false });
          } catch (err) {
            console.error("Clean sign out encounter issues:", err);
            set({ user: null, accessToken: null, isAdmin: false, isCompliant: true, loading: false });
          }
        }
      };
    },
    {
      name: 'prime-auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAdmin: state.isAdmin,
        isCompliant: state.isCompliant,
        accessToken: state.accessToken
        // intentionally NOT persisting loading so it can hydrate and still trigger background fetches safely
      }),
    }
  )
);
