const BASE_URL = "http://localhost/api/index.php";
export async function getDetail(code) {
    const res = await fetch (`${BASE_URL}/detail/${code}`)
    return res.json()
}