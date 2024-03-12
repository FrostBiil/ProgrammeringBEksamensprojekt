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
            }, function (accessToken: any, refreshToken: any, profile: any, done: (err: any, user: any) => void) {
                console.log(profile, accessToken, refreshToken);
                return done(null, profile);
            })
        )

        passport.serializeUser((user: any, done) => {
            console.log("Serializing", user);
            done(null, user);
        })

        passport.deserializeUser((user: any, done) => {
            console.log("Deserializing", user);
            done(null, user);
        })

        // passport.serializeUser((user: any, done) => {
        //     user = user as IGithubOauthProfile;
        //     const userObject: User = {
        //         id: user.id,

        //         username: user.username,
        //         photo: user.photos[0].value,
        //         displayName: user.displayName,
        //         email: user.emails[0].value,

        //         company: user._json.company,
        //         location: user._json.location,
        //     }

        //     prisma.user.upsert({
        //         where: {
        //             id: user.id
        //         }, 
        //         update:userObject,
        //         create: userObject
        //     }).then(() => {
        //         done(null, user.id);
        //     }).catch((err) => {
        //         done(err, null);
        //     })
        // });

        // passport.deserializeUser((userId: string, done) => {
        //     console.log("Deserializing", userId);
        //     prisma.user.findUnique({
        //         where: {
        //             id: userId
        //         }
        //     }).then((user) => {
        //         console.log("Deserialized", user);
        //         done(null, user);
        //     }).catch((err) => {
        //         done(err, null);
        //     })
        // });


    }

    protected routes(): void {

        this.router.get("/", (req, res) => {
            /**
             * Returner info om brugeren, hvis brugeren er logget ind
             */
            res.send((req.session as any));
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