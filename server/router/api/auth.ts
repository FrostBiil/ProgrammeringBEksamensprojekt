import passport from "passport";
import Router from "../Router";
import { Strategy as GithubStrategy } from "passport-github2";
import { prisma } from "../../utils/db";
import { User } from "@prisma/client";

/**
 * Interface til Githubs Oauth profil
 */
interface IGithubOauthProfile {
    id: string;
    nodeId: string;
    displayName: string;
    username: string;
    profileUrl: string;
    photos: { value: string }[];
    provider: string;
    _raw: string;
    _json: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        name: string;
        company: string;
        blog: string;
        location: string;
        email: string;
        hireable: string;
        bio: string;
        twitter_username: string;
        public_repos: number;
        public_gists: number;
        followers: number;
        following: number;
        created_at: string;
        updated_at: string;
    };
    emails: { value: string; }[];
}

class AuthRoutes extends Router {
    public baseRoute = "/auth";

    constructor() {
        super();

        passport.use(
            new GithubStrategy({
                clientID: process.env.GITHUB_CLIENT_ID!,
                clientSecret: process.env.GITHUB_CLIENT_SECRET!,
                scope: ["user:email", "read:user"],
                callbackURL: "http://localhost:3000/api/auth/github/callback"
            }, function (accessToken: any, refreshToken: any, profile: IGithubOauthProfile, done: (err: any, user: any) => void) {

                const obj: Omit<User, "joinedAt"> = {
                    accessToken,
                    id: profile.id,
                    displayName: profile.displayName || profile._json.name || profile.username,
                    username: profile.username,
                    photo: profile.photos[0].value,
                    email: profile.emails[0].value,
                    company: profile._json.company,
                    location: profile._json.location,
                };

                prisma.user.upsert({
                    where: {
                        id: profile.id
                    },
                    create: obj,
                    update: obj
                }).then(() => {
                    return done(null, profile);
                }).catch((err) => {
                    return done(err, null);
                })
            })
        )

        passport.serializeUser((user: any, done) => {
            done(null, user.id);
        })

        passport.deserializeUser((id: any, done) => {
            prisma.user.findUnique({
                where: { id }
            }).then((user) => {
                done(null, user)
            }).catch((err) => {
                done(err, null)
            })
        })
    }

    protected routes(): void {

        this.router.get("/me", (req, res) => {
            /**
             * Returner info om brugeren, hvis brugeren er logget ind
             */
            const user = req.user as User;
            if(!user) return res.status(401).json({
                status: 401,
                message: "Not logged in"
            })
            return res.status(200).json({
                status: 200,
                data: user
            })
        })

        this.router.get("/github", passport.authenticate("github"));

        this.router.get("/github/callback", passport.authenticate("github"), function (req, res) {
            /**
             * Authentication virkede og brugeren er logget ind
             */
            res.redirect("/");
        });
    }
}

export default new AuthRoutes()