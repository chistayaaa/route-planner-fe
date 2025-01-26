import { api } from "../api";

interface RegisterBody {
  email: string;
  password: string;
  name: string;
}

export async function registerUser(body: RegisterBody) {
  return await api<RegisterBody>({
    path: "auth/register",
    body,
    method: "POST",
  });
}
