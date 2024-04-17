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
  Box,
  Flex,
  Pill,
  SimpleGrid,
  Group,
  Input,
  MultiSelect,
  TagsInput,
  Center,
  Loader,
} from "@mantine/core";
import { Game } from "@prisma/client";
import { Api } from "../utils/api";
import { AuthContext } from "../contexts/AuthProvider";
import { GameCardLarge } from "../components/GameCardLarge";
import { useDebouncedState } from "@mantine/hooks";

export function StorePage() {

  const [games, setGames] = useState<Game[]>([]);
  const theme = useMantineTheme();
  const { user } = useContext(AuthContext);

  const [search, setSearch] = useDebouncedState("", 200);
  const [genres, setGenres] = useState<string[] | undefined>(undefined);
  const [tags, setTags] = useDebouncedState<string[]>([], 200);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    Api.getGames(search.length > 0 ? search : undefined, genres && (genres?.length > 0) ? genres : undefined, tags.length > 0 ? tags : undefined).then((games) => {
      console.log(games);
      setGames(games);
      setLoading(false);
    });
  }, [search, genres, tags]);

  const addGameButton = (item: Game) => {
    return user ? (
      <SimpleGrid mt={"md"} cols={2} w={"100%"}>
        <Button size="sm" variant="outline" onClick={() => {
          window.location.href = `/spil/${item.id}`;
        }} >
          Se detaljer
        </Button>
        <Button size="sm" onClick={() => {
          Api.addGameToUser(item.id);

          setGames(games.filter((game) => game.id !== item.id));
        }}>
          Tilføj spil
        </Button>
      </SimpleGrid>
    ) : (
      <></>
    );
  };

  const featuredGames = games.slice(0, 5).map((item) => {
    return <Carousel.Slide key={item.id}>
      <GameCardLarge game={item} />
    </Carousel.Slide>
  });

  const gridElements = games.map((item) => (
    <Paper key={item.id} shadow="md" withBorder radius="lg" p="lg">
      <Flex direction={"column"} h={"100%"}>
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

        <Box style={{ flexGrow: 1 }} />

        <Group mt="xs">
          {user && (
            <>
              {addGameButton(item)}
            </>
          )}
        </Group>
      </Flex>
    </Paper>
  ));

  if (loading) return <Center pt={"xl"}>
    <Loader />
  </Center>

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
          style={{ overflow: "visible" }}
        >
          {featuredGames}
        </Carousel>
      </Box>
      <Box bg={theme.colors[theme.primaryColor][0]} p={"md"}
        style={{
          position: "sticky",
          top: 0
        }}>
        <Title order={4}>Filtrer</Title>
        <Flex
          gap={"md"}
          direction={"row"}
        >
          <Input
            placeholder="Søg efter spil"
            style={{
              flexGrow: 3
            }}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
            }}
          />
          <MultiSelect
            style={{
              flexGrow: 1
            }}
            data={[
              "Action",
              "Adventure",
              "Casual",
              "Indie",
              "MassivelyMultiplayer",
              "Racing",
              "RPG",
              "Simulation",
              "Sports",
              "Strategy",
            ]}

            placeholder="Genres"

            onChange={(value) => {
              setGenres(value);
            }}
          />
          <TagsInput
            style={{
              flexGrow: 1
            }}
            placeholder="Tags"
            value={tags}
            onChange={(value) => {
              setTags(value);
            }}
          />
        </Flex>
      </Box>
      <Box>
        <SimpleGrid p="md" cols={4}>
          {gridElements}
        </SimpleGrid>
      </Box>
    </>
  );
}
