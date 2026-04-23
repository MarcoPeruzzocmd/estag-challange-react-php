export async function responseError(res) {
  if (!res.ok) {
    let errorMessage = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      errorMessage = data.error || errorMessage;
    } catch (error) {}
    throw new Error(errorMessage);
  }
  return res.json();
}
