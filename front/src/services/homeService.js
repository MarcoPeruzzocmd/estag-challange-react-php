const BASE_URL = "http://localhost/api/index.php";

export async function getOrderItem() {
  const res = await fetch(`${BASE_URL}/orderItem`);
  return res.json();
}

export async function createOrderItem(order) {
  const res = await fetch(`${BASE_URL}/orderItem`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
}

export async function deleteOrderItem(code) {
  const res = await fetch(`${BASE_URL}/orderItem`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
    return res.json()

}
