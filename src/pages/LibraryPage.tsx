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
import { Game, GameOwner } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Api } from "../utils/api";
import { IconHeart } from "@tabler/icons-react";

export function LibraryPage() {
  const [ownerships, setOwnerships] = useState<GameOwner[]>([]);
  const theme = useMantineTheme();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    Api.getUserGames().then((ownerships) => {
      console.log(ownerships);
      setOwnerships(ownerships.map((ownership) => ownership));
    });
  }, []);

  const downloadGameButton = (item: Game) => {
    return (
      <Group mt="xs">
        <Button size="sm" onClick={() => window.open(item.projectUrl + "/releases/latest")}>
          Download spil
        </Button>
      </Group>
    );
  };

  const games = (span?: number, sortedByDate?: boolean) => ownerships
    .sort((a, b) => sortedByDate ? (new Date(b.date).getTime() - new Date(a.date).getTime()) : (a as any as { game: Game }).game.title.localeCompare((b as any as { game: Game }).game.title))
    .map(o => (o as any as { game: Game }).game).map((item) => (
      <Grid.Col key={item.id} span={span ?? 2} p="lg">
        <Image
          style={{ aspectRatio: 16 / 9 }}
          radius="md"
          src={item.cover}
          alt={item.title}
        />
        <Title order={3} pt="md">
          {item.title}
        </Title>
        <Text c="gray" pb="md">
          {(item.genres ?? []).join(", ")}
        </Text>
        <Text fz="sm" mt="xs">
          {item.description}
        </Text>
        {item.tags && item.tags.length > 0 ? (
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
        ) : (
          <></>
        )}
        {downloadGameButton(item)}
      </Grid.Col>
    ));

  return (
    <>
      <Divider mx="md" labelPosition="left" label={"Senest spil"} />
      <Grid p="md">{games(2, true)}</Grid>

      <Divider mx="md" labelPosition="left" label={"Spil " + ownerships.length} />
      <Grid p="md">{games(2)}</Grid>
    </>
  );
}
