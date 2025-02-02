export const constructResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
  });
