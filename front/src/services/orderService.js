import { responseError } from "./errorResponse";
import { BASE_URL } from "./config";


export async function getOrder() {
  const res = await fetch(`${BASE_URL}/order`);
  return responseError(res)
}


