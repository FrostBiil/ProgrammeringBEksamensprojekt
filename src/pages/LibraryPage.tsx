import {
  Image,
  Text,
  Title,
  Button,
  Divider,
  Flex,
  Pill,
  Grid,
  Group,
} from "@mantine/core";
import { Game, GameOwner } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Api } from "../utils/api";

export function LibraryPage() {
  const [ownerships, setOwnerships] = useState<GameOwner[]>([]);

  useEffect(() => {
    Api.getUserGames().then((fetchedOwnerships) => {
      console.log(fetchedOwnerships);
      setOwnerships(fetchedOwnerships as any);
    });
  }, []);

  const downloadGameButton = (item: Game) => {
    return (
      <Group mt="xs">
        <Button size="sm" onClick={() => window.open(item.projectUrl)}>
          Download spil
        </Button>
      </Group>
    );
  };

  const userGamesGrid = (span: number, sorted?: boolean) =>
    ownerships
      .map((o) => (o as any as { game: Game }).game)
      .map((item) => (
        <Grid.Col key={item.id} span={span} p="lg">
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
      <Grid p="md">{userGamesGrid(4)}</Grid>

      <Divider
        mx="md"
        labelPosition="left"
        label={"Spil " + ownerships.length}
      />
      <Grid p="md">{userGamesGrid(3)}</Grid>
    </>
  );
}
