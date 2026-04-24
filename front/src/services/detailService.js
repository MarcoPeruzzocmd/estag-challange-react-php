import { responseError } from "./errorResponse";
import { BASE_URL } from "./config";

export async function getDetail(code) {
    const res = await fetch (`${BASE_URL}/detail/${code}`)
    return responseError(res)
}