import { useParams } from "react-router-dom";
import { Api } from "../utils/api";
import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Image,
  useMantineTheme,
  Grid,
  GridCol,
} from "@mantine/core";

interface Game {
  id: string;
  releaseDate: Date;
  lastUpdated: Date;
  publisherId: string;
  projectUrl: string;
  title: string;
  description: string;
  tags: string[];
  genres: string[];
  cover: string;
  screenshots: string[];
}

export function GamePage() {
  // /spil/:id
  const { id } = useParams();

  const [game, setGame] = useState<Game | null>(null);

  const theme = useMantineTheme();

  useEffect(() => {
    if (id === undefined) {
      return;
    }
    Api.getGame(id).then((game) => {
      setGame(game);
    });
  }, [id]);

  if (game === null) {
    return <Container>Loading...</Container>;
  }
  return (
    <>
      <Container mt={"xl"}>
        <Paper withBorder shadow={"md"} p={"md"}>
          <Grid>
            <Grid.Col>
              <Image
                style={{ aspectRatio: 16 / 9 }}
                radius="md"
                src={game.cover}
                alt={game.title}
              />
            </Grid.Col>
            <Grid.Col></Grid.Col>
          </Grid>
          <h3>{game.title}</h3>
        </Paper>
      </Container>
    </>
  );
}
