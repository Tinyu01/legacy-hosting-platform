/**
 * @legacy-hosting/auth
 * Shared authentication contracts and helpers.
 * Phase 0 scaffold — real session/JWT logic lands with the API auth module.
 */

export type AuthUser = {
  id: string;
  email: string;
  displayName?: string;
};

export type Session = {
  user: AuthUser;
  expiresAt: string;
};
