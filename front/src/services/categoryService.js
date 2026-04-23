import { responseError } from "./errorResponse";

const BASE_URL = "http://localhost";

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/category`);
  return responseError(res)
}

export async function createCategory(product) {
  const res = await fetch(`${BASE_URL}/category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return responseError(res)
}

export async function deleteCategory(code) {
  const res = await fetch(`${BASE_URL}/category`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
    return responseError(res)

}
