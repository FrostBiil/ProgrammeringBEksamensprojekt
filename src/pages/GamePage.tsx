import { useParams } from "react-router-dom";
import { Api } from "../utils/api";
import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Image,
  Text,
  Flex,
  Box,
  Divider,
  Pill,
  useMantineTheme,
  Button,
  Group,
  Center,
  Loader,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";

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

  const [loading, setLoading] = useState(true);

  const theme = useMantineTheme();

  const downloadGameButton = (item: Game) => {
    return (
      <Group mt="xs">
        <Button
          fullWidth
          justify="center"
          size="sm"
          onClick={() => window.open(item.projectUrl + "/releases/latest")}
        >
          Download spil
        </Button>
      </Group>
    );
  };

  useEffect(() => {
    if (id === undefined) {
      return;
    }
    Api.getGame(id).then((game) => {
      setGame(game);

      setLoading(false);
    });
  }, [id]);

  if (loading || game === null)
    return (
      <Center pt={"xl"}>
        <Loader />
      </Center>
    );

  return (
    <>
      <Container mt={"xl"}>
        <Paper withBorder shadow={"md"} p={"md"}>
          <Flex h="100%">
            <Flex direction={"column"} h={"100%"} p="xs">
              <Image
                style={{ aspectRatio: 16 / 9 }}
                radius="md"
                src={game.cover}
                alt={game.title}
              />
              <Carousel withIndicators height={200} slidesToScroll={5}>
                {game.screenshots.map((screenshot) => (
                  <Carousel.Slide>
                    <Image
                      style={{ aspectRatio: 16 / 9 }}
                      src={screenshot}
                      alt={game.title}
                    />
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Flex>
            <Flex direction={"column"} p="xs" gap={"sm"}>
              <Image
                w={"10vw"}
                style={{ aspectRatio: 16 / 9 }}
                radius="md"
                src={game.cover}
                alt={game.title}
              />
              <h3>{game.title}</h3>
              <Text>{game.description}</Text>
              <Divider label="Genres" labelPosition="left" />
              <Text>{game.genres.join(", ")}</Text>
              <Divider label="Tags" labelPosition="left" />
              <Flex>
                {game.tags.map((tag) => (
                  <Pill
                    key={tag}
                    radius="xl"
                    variant="filled"
                    bg={theme.colors[theme.primaryColor][1]}
                  >
                    {tag}
                  </Pill>
                ))}
              </Flex>
              <Divider />
              <Box style={{ flexGrow: 1 }} />

              {downloadGameButton(game)}
            </Flex>
          </Flex>
        </Paper>
      </Container>
    </>
  );
}
