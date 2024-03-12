import { API_BASEURL, IS_PRODUCTION } from "./config";

export class Api {

    private static getEndpoint(endpoint: string) {
        if(IS_PRODUCTION) {
            /** Production api endpoint er på den samme server */
            return API_BASEURL + endpoint;
        } 

        /** Development endpointet er ikke, da man ikke kan køre to webservere på samme port*/
        return "http://localhost:3000/api" + endpoint;
    }

    public static fetch(endpoint: string, method: string = "GET", body?: any) {
        return window.fetch(this.getEndpoint(endpoint), {
            method: method,
            body: typeof body === "string" ? body : JSON.stringify(body),
            credentials: IS_PRODUCTION ? "same-origin" : "include",
        })
    }

    public static login(redirectSuccess?: string) {
        // URL encode hvor den skal redirect til efter login
        const currentUrl = window.location.href;
        const redirect = encodeURIComponent(redirectSuccess || currentUrl);
        
        console.log(redirect);

        // Redirect til /api/auth/login
        window.location.href = this.getEndpoint(`/auth/github?redirect=${redirect}`);
    }

    public static async me() {
        /* Fetch /api/auth/me */
        const res = await this.fetch("/auth/me");
        if (res.status === 200) {
            return res.json();
        } else {
            return null;
        }
    }
}