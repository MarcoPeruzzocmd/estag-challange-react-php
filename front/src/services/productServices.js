const BASE_URL = "http://localhost";
import { responseError } from "./errorResponse";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/product`);
  return responseError(res)
}

export async function createProducts(product) {
  const res = await fetch(`${BASE_URL}/product`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return responseError(res);
}

export async function deleteProduct(code) {
  const res = await fetch(`${BASE_URL}/product`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
    return responseError(res)

}
