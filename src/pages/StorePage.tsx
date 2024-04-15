import React, { useContext, useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import {
  Image,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  Divider,
  ActionIcon,
  Box,
  Flex,
  Pill,
  SimpleGrid,
  Group,
} from "@mantine/core";
import { Game } from "@prisma/client";
import { Api } from "../utils/api";
import { AuthContext } from "../contexts/AuthProvider";

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
      <Paper shadow="md" withBorder radius="lg" style={{ overflow: "clip", position: "relative" }}>
        <Image
          style={{ aspectRatio: 16 / 9 }}
          src={item.cover}
          alt={item.title}
        />
        <Box pos={"absolute"} style={{
          width: "100%",
          bottom: 0,
          backgroundImage: "linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0))",
        }}>
          <Title order={3} pt="md">
            {item.title}
          </Title>
        </Box>
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

      <Group mt="xs">
        {user && (
          <>
            {addGameButton(item)}
          </>
        )}
      </Group>
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
