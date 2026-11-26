// Lightweight role gate for the admin dashboard.
// In a Supabase-backed version this would be replaced by auth.uid() + a
// profiles.role column and RLS policies. For the prototype we keep a simple
// session flag in localStorage so ordinary visitors never see admin controls.

const ADMIN_FLAG = 'lifelink.admin';

export function isAdmin(): boolean {
  try {
    return localStorage.getItem(ADMIN_FLAG) === '1';
  } catch {
    return false;
  }
}

export function loginAdmin(): void {
  try {
    localStorage.setItem(ADMIN_FLAG, '1');
  } catch {
    // ignore
  }
}

export function logoutAdmin(): void {
  try {
    localStorage.removeItem(ADMIN_FLAG);
  } catch {
    // ignore
  }
}
