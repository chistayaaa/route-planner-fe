import { api } from "../api";

interface ResetBody {
  newPassword: string;
  token: string;
}

export async function resetPassword(body: ResetBody) {
  return await api<ResetBody>({
    path: "auth/reset-password",
    body,
    method: "POST",
  });
}
