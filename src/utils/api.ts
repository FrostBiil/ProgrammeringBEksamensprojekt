import { API_BASEURL } from "./config";

export class Api {
    private static fetch(endpoint: string, method: string = "GET", body?: any) {
        return window.fetch(API_BASEURL + endpoint, {
            method: method,
            body: typeof body === "string" ? body : JSON.stringify(body),
        })
    }
}