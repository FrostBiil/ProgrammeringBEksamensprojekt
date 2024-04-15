import { useParams } from "react-router-dom";

export function GamePage() {

    // /game/:id
    const { id } = useParams()
    console.log("Game ID:", id)


    return <h1>Game Page</h1>;
}