import { api } from "../api";

interface UpdateBody {
  id: string;
  data: object;
}

export async function updateUser(body: UpdateBody) {
  return await api<UpdateBody>({
    path: "user/update",
    body,
    method: "PATCH",
  });
}
