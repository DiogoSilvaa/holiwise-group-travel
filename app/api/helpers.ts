export const constructResponse = (body: any, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
  });
