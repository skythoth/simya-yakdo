export default async (req) => {
  const url = new URL(req.url);
  const serviceKey = process.env.VITE_SERVICE_KEY;

  const targetUrl = new URL(
    "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo",
  );

  url.searchParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value);
  });

  if (serviceKey) {
    targetUrl.searchParams.set("serviceKey", serviceKey);
  }

  const response = await fetch(targetUrl.toString());
  const data = await response.text();

  return new Response(data, {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get("Content-Type") || "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const config = {
  path: "/api/holiday",
};
