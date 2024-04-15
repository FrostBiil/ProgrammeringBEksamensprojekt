import React, { useContext, useEffect, useState } from "react";
import { IconHeart } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  Image,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  Container,
  Divider,
  ActionIcon,
  rem,
  Box,
  Flex,
  Chip,
  Pill,
  Grid,
  SimpleGrid,
  Group,
} from "@mantine/core";
import { Game } from "@prisma/client";
import { Api } from "../utils/api";
import { AuthContext } from "../contexts/AuthProvider";

interface CardProps {
  image: string;
  title: string;
  genre: string;
}

export function StorePage() {
  const [games, setGames] = useState<Game[]>([]);
  const theme = useMantineTheme();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    Api.getGames().then((games) => {
      console.log(games);
      setGames(games);
    });
  }, []);

  const addGameButton = (item: Game) => {
    return user ? (
      <Group mt="xs">
        <Button size="sm" onClick={() => Api.addGameToUser(item.id)}>
          Tilføj spil
        </Button>
      </Group>
    ) : (
      <></>
    );
  };

  const featuredGames = games.slice(0, 5).map((item) => (
    <Carousel.Slide key={item.id}>
      <Paper shadow="md" withBorder radius="lg" p="lg">
        <Image
          style={{ aspectRatio: 16 / 6 }}
          radius="md"
          src={item.cover}
          alt={item.title}
        />
        <Title
          order={3}
          py="md"
          textWrap="nowrap"
          style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {item.title}
        </Title>
        <Text color="gray" pb="md">
          {item.genres.join(", ")}
        </Text>
        {addGameButton(item)}
      </Paper>
    </Carousel.Slide>
  ));

  const gridElements = games.map((item) => (
    <Paper key={item.id} shadow="md" withBorder radius="lg" p="lg">
      <Image
        style={{ aspectRatio: 16 / 9 }}
        radius="md"
        src={item.cover}
        alt={item.title}
      />
      <Title order={3} pt="md">
        {item.title}
      </Title>
      <Text color="gray" pb="md">
        {item.genres.join(", ")}
      </Text>
      <Text fz="sm" mt="xs">
        {item.description}
      </Text>
      {item.tags.length > 0 ? (
        <>
          <Divider mt="md" labelPosition="left" label="Tags" />
          <Flex wrap={"wrap"} gap="md" pt={"md"}>
            {item.tags.map((tag) => (
              <Pill key={tag} color="blue" style={{ marginRight: 5 }}>
                {tag}
              </Pill>
            ))}
          </Flex>
          <Divider mt="xs" />
        </>
      ) : null}
<<<<<<< Updated upstream

      <Group mt="xs">
        {user && (
          <>
            <Button size="sm" onClick={async () => console.log(await Api.addGameToUser(item.id))}>
              Tilføj spil
            </Button>{" "}
            <ActionIcon variant="default" radius="md" size={36}>
              <IconHeart color={theme.colors["red"][6]} stroke={1.5} />
            </ActionIcon>
          </>
        )}
      </Group>
=======
      {addGameButton(item)}
>>>>>>> Stashed changes
    </Paper>
  ));

  return (
    <>
      <Box w="100%" bg={theme.colors[theme.primaryColor][1]} py="lg">
        <Carousel
          withIndicators
          slideSize={"32%"}
          slideGap={"xl"}
          p="md"
          align="start"
          loop
          slidesToScroll={3}
        >
          {featuredGames}
        </Carousel>
      </Box>
      <Flex>
        <Box bg={theme.colors[theme.primaryColor][0]} w={500}></Box>
        <Box>
          <SimpleGrid p="md" cols={5}>
            {gridElements}
          </SimpleGrid>
        </Box>
      </Flex>
    </>
  );
}
