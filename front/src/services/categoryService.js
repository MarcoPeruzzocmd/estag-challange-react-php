import { responseError } from "./errorResponse";
import { BASE_URL } from "./config";

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/category`);
  return responseError(res)
}

export async function createCategory(category) {
  const res = await fetch(`${BASE_URL}/category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
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
