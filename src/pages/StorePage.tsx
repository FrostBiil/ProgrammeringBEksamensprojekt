import React from "react";
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
} from "@mantine/core";

interface CardProps {
  image: string;
  title: string;
  genre: string;
}

// Card component adjusted for proper Mantine and CSS properties usage
function Card({ image, title, genre }: CardProps) {
  return (
    <Paper
      shadow="md"
      style={{
        height: "800px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "xl",
        borderRadius: "md",
      }}
    >
      <div>
        <Text c="blue" size="sm">
          {genre}
        </Text>
        <Title
          c="blue"
          order={3}
          style={{
            fontFamily: "sans-serif",
            fw: 700,
            lineHeight: 1.2,
            fontSize: "xl",
          }}
        >
          {title}
        </Title>
      </div>
      <Button variant="filled" color="blue" style={{ width: "100%" }}>
        Check out the game
      </Button>
    </Paper>
  );
}

const data = [
  {
    image:
      "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Example title 1",
    genre: "Genre 1",
  },
  {
    image:
      "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Example title 2",
    genre: "Genre 2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Best places to visit this winter",
    genre: "tourism",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Active volcanos reviews: travel at your own risk",
    genre: "nature",
  },
];

export function StorePage() {
  const theme = useMantineTheme();

  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <>
      <h1>Store!</h1>
      <Image
        radius="md"
        src="https://t3.ftcdn.net/jpg/02/68/48/86/360_F_268488616_wcoB2JnGbOD2u3bpn2GPmu0KJQ4Ah66T.jpg"
      />
      <Container
        size="xl"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Carousel
          slideGap="sm" // Adjusted slide gap for smaller spacing
          style={{ maxWidth: "80%", margin: "0 auto" }} // Adjust the Carousel width and centering
        >
          {slides}
        </Carousel>
      </Container>
    </>
  );
}
