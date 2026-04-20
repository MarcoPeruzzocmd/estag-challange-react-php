const BASE_URL = "http://localhost/api/index.php";

export async function getOrder() {
  const res = await fetch(`${BASE_URL}/order`);
  return res.json();
}


