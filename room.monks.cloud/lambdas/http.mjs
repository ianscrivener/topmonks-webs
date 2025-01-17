/**
 * @param {Record<string, any> | string} body
 * @param {Record<string, boolean | number | string>} [headers]
 * @returns {APIGatewayProxyResult}
 */
export function response(body, headers) {
  return {
    statusCode: 200,
    body: typeof body === "string" ? body : JSON.stringify(body),
    headers
  };
}
/**
 * @param {Record<string, any>} body
 * @returns {APIGatewayProxyResult}
 */
export function notFound(body = { error: "Data not found" }) {
  return {
    statusCode: 404,
    body: JSON.stringify(body)
  };
}

/**
 * @callback ResponseTransformer
 * @param {APIGatewayProxyResult} in
 * @returns {APIGatewayProxyResult}
 */
/**
 * @param {string | string[]} methods
 * @param {string} [origin]
 * @return {ResponseTransformer}
 */
export function withCORS(methods, origin = "*") {
  const allowMethods = Array.isArray(methods) ? methods.join(",") : methods;
  return x => ({
    ...x,
    headers: {
      ...x.headers,
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": allowMethods,
      "Access-Control-Allow-Headers":
        "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token"
    }
  });
}
