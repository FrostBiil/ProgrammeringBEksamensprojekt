import React, { useEffect, useState } from "react";
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
  rem,
  Box,
  Flex,
  Chip,
  Pill,
  Grid,
  SimpleGrid,
} from "@mantine/core";
import { Game } from "@prisma/client";
import { Api } from "../utils/api";

interface CardProps {
  image: string;
  title: string;
  genre: string;
}


export function StorePage() {
  const [games, setGames] = useState<Game[]>([]);
  const theme = useMantineTheme();

  useEffect(() => {
    Api.getGames().then((games) => {
      console.log(games);
      setGames(games);
    });
  }, []);

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
        <Button size="sm">Buy now</Button>
      </Paper>
    </Carousel.Slide>
  ));

  const gridElements = games.map((item) => (
    <Paper
    key={item.id}
      shadow="md"
      withBorder
      radius="lg"
      p="lg"
    >
      <Image
        style={{ aspectRatio: 16 / 9 }}
        radius="md"
        src={item.cover}
        alt={item.title}
      />
      <Title order={3} py="md">
        {item.title}
      </Title>
      <Text color="gray" pb="md">
        {item.genres.join(", ")}
      </Text>
      <Flex wrap={"wrap"} gap="md">
        {["Adventure", "RPG", "Action", "Indie", "Singleplayer"].map((tag) => (
          <Pill key={tag} color="blue" style={{ marginRight: 5 }}>
            {tag}
          </Pill>
        ))}
      </Flex>
    </Paper>
  ));

  return (
    <>
      <Box w="100%" bg="lightblue" py="lg">
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
      <SimpleGrid p="md" cols={5}>
        {gridElements}
      </SimpleGrid>
    </>
  );
}
