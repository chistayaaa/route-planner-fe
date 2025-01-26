import { api } from "../api";

interface ForgotBody {
  email: string;
}

export async function forgotPassword(body: ForgotBody) {
  return await api<ForgotBody>({
    path: "auth/forgot-password",
    body,
    method: "POST",
  });
}
