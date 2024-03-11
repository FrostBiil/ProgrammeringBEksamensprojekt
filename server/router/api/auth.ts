import passport from "passport";
import Router from "../Router";
import { Strategy as GithubStrategy } from "passport-github2";

class AuthRoutes extends Router {
    public baseRoute = "/auth";

    constructor() {
        super();

        passport.use(
            new GithubStrategy({
                clientID: process.env.GITHUB_CLIENT_ID!,
                clientSecret: process.env.GITHUB_CLIENT_SECRET!,
                callbackURL: "http://localhost:3000/api/auth/github/callback"
            }, function (accessToken : any, refreshToken : any, profile : any, done: (err: any, user: any) => void) {
                console.log(profile, accessToken, refreshToken);
                return done(null, profile);
            })
        )

        passport.serializeUser(function (user: any, done) {
            done(null, user);
        });

        passport.deserializeUser(function (obj: any, done) {
            done(null, obj);
        });
    }

    protected routes(): void {

        this.router.get("/", (req, res) => {
            /**
             * Returner info om brugeren, hvis brugeren er logget ind
             */
            res.send((req.session as any).passport?.user || "Not logged in");
        })

        this.router.get("/github", passport.authenticate("github", { scope: ["user:email", ""] }));

        this.router.get("/github/callback", passport.authenticate("github"), function (req, res) {
            /**
             * Authentication virkede og brugeren er logget ind
             */

            res.redirect("/");
        });
    }
}

export default new AuthRoutes()