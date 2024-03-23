import React from "react";
import { Divider } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

export function StorePage() {
  return (
    <>
      <h1>Butik!</h1>
      <Divider />
      <p>Full width banner</p>
      <Divider />
      <Carousel
        withIndicators
        height={200}
        w="100%"
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        slideGap={{ base: 0, sm: "md" }}
        loop
        align="start"
      >
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
        <Carousel.Slide>4</Carousel.Slide>
        {/* ...other slides */}
      </Carousel>
    </>
  );
}
