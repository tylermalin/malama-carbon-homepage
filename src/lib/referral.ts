export function getAndPersistReferralCode(): string | null {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  const urlRef = params.get("ref");
  
  if (urlRef) {
    try {
      localStorage.setItem("refCode", urlRef);
      return urlRef;
    } catch (e) {
      console.warn('Could not save referral code to localStorage', e);
    }
  }
  
  try {
    return localStorage.getItem("refCode");
  } catch (e) {
    return null;
  }
}
