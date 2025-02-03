interface ApiParams<T = Record<string, unknown>> {
  path: string;
  method: string;
  body?: T | FormData | null; // Allow null as well
  stringify?: boolean;
}

export const api = async <T = Record<string, unknown>>(
  params: ApiParams<T>
) => {
  const { path, method, body, stringify = true } = params;

  const url = `${import.meta.env.VITE_PAYLOAD_API_URL}/${path}`;
  const data: RequestInit = {
    method,
    headers: {
      "Content-Type": body instanceof FormData ? "multipart/form-data" : "application/json",
    },
  };


  if (body) {
    data.body = stringify && !(body instanceof FormData) ? JSON.stringify(body) : body as BodyInit; 
  }

  if (body instanceof FormData) {
    console.log("body FormData file", body.get('file'));
  }

  let response;
  try {
    response = await fetch(url, data);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response?.status} ${response?.statusText}`);
    }
    return await response.json();
  } catch (error: unknown) {
    if (response) {
      const errorResponse = await response.json();
      throw `Ошибка: ${errorResponse.error}`;
    }
    if (typeof error === "string") {
      throw `Ошибка: ${error}`;
    }
    throw `Ошибка: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`;
  }
};
