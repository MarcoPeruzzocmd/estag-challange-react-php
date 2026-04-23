import { responseError } from "./errorResponse";

const BASE_URL = "http://localhost";

export async function getOrderItem() {
  const res = await fetch(`${BASE_URL}/orderItem`);
  return responseError(res)
}

export async function createOrderItem(order) {
  const res = await fetch(`${BASE_URL}/orderItem`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  })
  return responseError(res)
}

export async function deleteOrderItem(code) {
  const res = await fetch(`${BASE_URL}/orderItem`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
    return responseError(res)

}

export async function finishOrderItem() {
  const res = await fetch(`${BASE_URL}/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
    return responseError(res)
}

export async function cancelOrderItem(params) {
  const res = await fetch(`${BASE_URL}/orderItem`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return responseError(res);
}