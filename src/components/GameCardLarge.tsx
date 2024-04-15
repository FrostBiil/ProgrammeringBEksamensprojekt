import { Paper, Flex, Box, Title, Image, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { Game } from "@prisma/client";
import React from "react";

export function GameCardLarge(props: { game: Game }) {

    const { ref, hovered } = useHover()

    return <Paper ref={ref} shadow="md" style={{ overflow: "clip" }} withBorder radius="md" >
        <Flex direction={"column"} >
            <Image
                style={{
                    aspectRatio: 16 / 9,
                    transition: "transform 200ms",
                    transform: hovered ? "scale(1.05)" : "scale(1)",
                }}
                src={props.game.cover}
                alt={props.game.title}
            />
            <Box p={"sm"}>
                <Title order={3}>
                    {props.game.title}
                </Title>
                <Text size={"sm"} >
                    {props.game.description}
                </Text>
            </Box>
        </Flex>
    </Paper>
}