import { API_BASEURL, IS_PRODUCTION } from "./config";
import { ImageConverter } from "./imageConverter"

export class Api {
  private static getEndpoint(endpoint: string) {
    if (IS_PRODUCTION) {
      /** Production api endpoint er på den samme server */
      return API_BASEURL + endpoint;
    }

    /** Development endpointet er ikke, da man ikke kan køre to webservere på samme port*/
    return "http://localhost:3000/api" + endpoint;
  }

  private static fetch(endpoint: string, method: string = "GET", body?: any) {
    return window.fetch(this.getEndpoint(endpoint), {
      method: method,
      body: typeof body === "string" ? body : JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },

      // Nødvendigt for at kunne sende cookies med i fetch requesten, men kun i development da de kører på samme server i production
      credentials: IS_PRODUCTION ? "same-origin" : "include",
    });
  }

  public static login(redirectSuccess?: string) {
    // URL encode hvor den skal redirect til efter login (hvis ikke angivet, så redirecter den til den nuværende side)
    const currentUrl = window.location.href;
    const redirect = encodeURIComponent(redirectSuccess || currentUrl);

    console.log(redirect);

    // Redirect til /api/auth/github?redirect=URL
    window.location.href = this.getEndpoint(
      `/auth/github?redirect=${redirect}`
    );
  }

  public static logout() {
    // /api/auth/logout
    Api.fetch("/auth/logout");
  }

  public static async me(): Promise<User | null> {
    // Fetch /api/auth/me
    const res = await this.fetch("/auth/me");
    if (res.status === 200) {
      return (await res.json()).data as User;
    } else {
      return null;
    }
  }

  public static publishGame(gameData: {
    projectUrl: string;
    title: string;
    description: string;
    visibility: string;
    tags: string[];
    genres: string[];
    cover: string;
    screenshots: string[];
  }) {
    this.fetch("/games", "POST", gameData);
  }
}
