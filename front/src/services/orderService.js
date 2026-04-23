import { responseError } from "./errorResponse";

const BASE_URL = "http://localhost";

export async function getOrder() {
  const res = await fetch(`${BASE_URL}/order`);
  return responseError(res)
}


