interface ApiParams<T = Record<string, unknown>> {
  path: string
  method: string
  body?: T
}

export const api = async <T = Record<string, unknown>>(params: ApiParams<T>) => {
  const { path, method, body } = params

  const url = `${import.meta.env.VITE_PAYLOAD_API_URL}/${path}`
  const data: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (body) {
    data.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(url, data)
    if (!response.ok) {
      throw new Error(`Error: ${response?.status} ${response?.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.log('Error in API:', error)
    throw error
  }
}
