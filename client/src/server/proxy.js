import httpProxy from "http-proxy";

export const proxy = httpProxy.createProxyServer({
  /**
   * Get the actual bac-end service url from env variables.
   * We shouldn't prefix the env variable with NEXT_PUBLIC_* to avoid exposing it to the client.
   */
  // target: process.env.SERVICE_URL,
  // target: "http://localhost:3146/api/",
  target: "http://localhost:8000/api",
  autoRewrite: false,
});
