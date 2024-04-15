import Router from "../Router"
import { prisma } from "../../utils/db";
import AuthRoutes from "./auth";
import { User } from "@prisma/client";

class UserRouter extends Router {
    public baseRoute = '/users'

    public routes() {


        this.router.post("/games/:gameId", AuthRoutes.protect, async (req, res) => {

            const userId = (req.user as User).id
            const gameId = req.params.gameId

            console.log({
                userId,
                gameId
            })

            const user = await prisma.user.findUnique({
                where: { id: userId }
            })

            if (!user) {
                return res.status(404).json({ error: "User not found" })
            }

            const game = await prisma.game.findUnique({
                where: { id: gameId }
            })

            if (!game) {
                return res.status(404).json({ error: "Game not found" })
            }

            const ownsGame = await prisma.gameOwner.findFirst({
                where: {
                    gameId,
                    userId
                }
            })

            if (ownsGame) {
                return res.status(400).json({ error: "Du ejer allerede dette spil" })
            }

            res.json(
                await prisma.gameOwner.create({
                    data: {
                        gameId,
                        userId
                    }
                })
            )
        });
    }
}

export default new UserRouter()