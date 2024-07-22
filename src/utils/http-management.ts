enum URL {
  CoinGecko = "https://api.coingecko.com/api/v3",
}
/**
 * API 回應的格式
 */
export type APIResponseDTO<T> = {
  status: boolean;
  token: string;
  message: string;
  result: T;
};

/**
 * HTTP 請求的方法
 */
export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 * 發送 HTTP 請求
 *
 * @param method HTTP 請求的方法
 * @param url 要發送的請求的路徑
 * @param params 要傳送的參數
 * @param token 要傳送的 token
 * @returns
 */
export const fetchData = async ({
  baseUrl = "CoinGecko",
  method,
  url,
  params,
}: {
  baseUrl?: "CoinGecko";
  method?: HTTPMethod;
  url: string;
  params?: unknown;
}) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("x-cg-demo-api-key", import.meta.env.VITE_COINGECKO_TOKEN);

  const response = await fetch(`${URL[baseUrl]}${url}`, {
    method: method ?? "GET",
    headers,
    body: params ? JSON.stringify(params) : undefined,
  });

  const data = await response.json();
  //   if (!data.status) {
  //     throw new Error(data.message);
  //   }

  return data;
};
