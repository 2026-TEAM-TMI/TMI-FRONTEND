import type { User } from "../types/user";

const BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export async function loginWithEmail(
  _email: string,
  _password: string
): Promise<{ user: User; token: string }> {
  // TODO: POST ${BASE}/auth/login { email, password }
  void BASE;
  throw new Error("Not implemented");
}

export async function loginWithGoogle(): Promise<{ user: User; token: string }> {
  // TODO: POST ${BASE}/auth/google (OAuth callback)
  void BASE;
  throw new Error("Not implemented");
}

export async function signUp(
  _email: string,
  _password: string,
  _name: string
): Promise<void> {
  // TODO: POST ${BASE}/auth/signup { email, password, name }
  void BASE;
  throw new Error("Not implemented");
}
