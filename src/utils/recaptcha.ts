/**
 * Utility to safely interface with Google reCAPTCHA Enterprise
 */
export const executeRecaptcha = async (action: string = 'LOGIN'): Promise<string | null> => {
  return new Promise((resolve) => {
    // Safely check if we are in browser environment and grecaptcha is loaded
    if (typeof window === 'undefined') {
      resolve(null);
      return;
    }

    const { grecaptcha } = window as any;

    if (!grecaptcha || !grecaptcha.enterprise) {
      console.warn('[reCAPTCHA] Google reCAPTCHA Enterprise script not loaded yet or unavailable in current screen state.');
      resolve(null);
      return;
    }

    let isResolved = false;
    const timeout = setTimeout(() => {
      if (!isResolved) {
        isResolved = true;
        console.warn('[reCAPTCHA] Timeout exceeded (3s) waiting for ready callback. Proceeding to prevent deadlock.');
        resolve(null);
      }
    }, 3000);

    try {
      grecaptcha.enterprise.ready(async () => {
        if (isResolved) return;
        try {
          const siteKey = '6LcLYQUtAAAAAFYNuLxERzU9a7F1xr5gFb7r4Xi2';
          const token = await grecaptcha.enterprise.execute(siteKey, { action });
          console.log(`[reCAPTCHA] Token executed successfully for action ${action}:`, token);
          if (!isResolved) {
            isResolved = true;
            clearTimeout(timeout);
            resolve(token);
          }
        } catch (execErr) {
          console.error('[reCAPTCHA] Execution failure:', execErr);
          if (!isResolved) {
            isResolved = true;
            clearTimeout(timeout);
            resolve(null);
          }
        }
      });
    } catch (err) {
      console.error('[reCAPTCHA] Ready callback setup error:', err);
      if (!isResolved) {
        isResolved = true;
        clearTimeout(timeout);
        resolve(null);
      }
    }
  });
};
