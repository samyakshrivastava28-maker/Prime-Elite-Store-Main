import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface RecentsState {
  recentProductIds: string[];
  addRecent: (id: string) => void;
  clearRecents: () => void;
}

export const useRecentsStore = create<RecentsState>()(
  persist(
    (set) => ({
      recentProductIds: [],
      addRecent: (id: string) =>
        set((state) => {
          // Remove if exists to push to front
          const filtered = state.recentProductIds.filter((p) => p !== id);
          return {
            recentProductIds: [id, ...filtered].slice(0, 10), // Keep 10
          };
        }),
      clearRecents: () => set({ recentProductIds: [] }),
    }),
    {
      name: 'prime-elite-recents',
    }
  )
);
