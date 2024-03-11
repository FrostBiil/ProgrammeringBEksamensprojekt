import { API_BASEURL } from "./config";

export class Api {
    private static fetch(endpoint: string) {
        return window.fetch(API_BASEURL + endpoint)
    }
}