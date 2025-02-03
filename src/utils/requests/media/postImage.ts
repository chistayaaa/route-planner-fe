export async function postImage(body: FormData) {
  try {
    const req = await fetch(
      `${import.meta.env.VITE_PAYLOAD_API_URL}/media/upload`,
      {
        method: "POST",
        body,
      }
    ).then((res) => res.json());

    console.log("postImage: response, ", req);
    return req;
  } catch (err) {
    console.log("postImage: err, ", err);
  }
}
