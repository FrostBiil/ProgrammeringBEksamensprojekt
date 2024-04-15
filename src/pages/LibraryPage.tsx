import {
  Image,
  Title,
  Button,
  Divider,
  Grid,
  Group,
} from "@mantine/core";
import { Game } from "@prisma/client";
import React, { useContext, useEffect, useState } from "react";
import { Api } from "../utils/api";
import { AuthContext } from "../contexts/AuthProvider";


export function LibraryPage() {
  const [games, setGames] = useState<Game[]>([]);
  const { user, loaded } = useContext(AuthContext);


  useEffect(() => {
    Api.getUserGames().then((ownerships) => {
      console.log(ownerships);
      setGames(ownerships.map((ownership) => ownership.game));
    });
  }, []);

  useEffect(() => {
    console.log(user)
    if (!user && loaded) {
      Api.login();
    }
  }, [user, loaded]);

  const downloadGameButton = (item: Game) => {
    return (
      <Group mt="xs">
        <Button size="sm" onClick={() => window.open(item.projectUrl)}>
          Download spil
        </Button>
      </Group>
    );
  };

  const userGamesGrid = (span: number) => games.map((item) => (
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
      {downloadGameButton(item)}
    </Grid.Col>
  ));

  return (
    <>
      <Divider mx="md" labelPosition="left" label={"Senest spil"} />
      <Grid p="md">{userGamesGrid(4)}</Grid>


      <Divider mx="md" labelPosition="left" label={"Spil " + games.length} />
      <Grid p="md">{userGamesGrid(3)}</Grid>
    </>
  );
}
