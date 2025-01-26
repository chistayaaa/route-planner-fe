import { api } from "../api";

export async function logoutUser(body = {}) {
  return await api({ path: "auth/logout", body, method: "POST" });
}
