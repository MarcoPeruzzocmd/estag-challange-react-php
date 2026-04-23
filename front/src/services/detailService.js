import { responseError } from "./errorResponse";

const BASE_URL = "http://localhost";
export async function getDetail(code) {
    const res = await fetch (`${BASE_URL}/detail/${code}`)
    return responseError(res)
}