export default async (req) => {
  const url = new URL(req.url);
  const serviceKey = process.env.VITE_SERVICE_KEY;

  const targetUrl = new URL(
    "https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire"
  );

  // 클라이언트의 쿼리 파라미터 그대로 전달
  url.searchParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value);
  });

  // serviceKey 주입
  if (serviceKey) {
    targetUrl.searchParams.set("serviceKey", serviceKey);
  }

  const response = await fetch(targetUrl.toString());
  const data = await response.text();

  return new Response(data, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const config = {
  path: "/api/pharmacy",
};
