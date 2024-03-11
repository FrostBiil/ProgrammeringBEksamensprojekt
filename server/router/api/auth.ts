import passport from "passport";
import Router from "../Router";
import { Strategy as GithubStrategy } from "passport-github2";

class AuthRoutes extends Router {
    public baseRoute = "/auth";

    constructor() {
        super();

        passport.use(
            new GithubStrategy({
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: "http://localhost:3000/api/auth/github/callback"
            }, function (accessToken, refreshToken, profile, done) {
                console.log(profile, accessToken, refreshToken);
                return done(null, profile);
            })
        )
    }

    protected routes(): void {

        this.router.get("/", (req, res) => {
            res.send("Auth route");
        })

        this.router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
    }
}

export default new AuthRoutes()