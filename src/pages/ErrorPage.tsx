import React from "react";
import {
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";

function goToHome() {
  window.location.href = "/";
}

export function ErrorPage() {
  return (
    <Container pt="80px" pb="80px">
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <div>
          <Title fw="900" fs="34px" mb="md" ff="arial">Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            onClick={goToHome}
            variant="outline"
            size="md"
            mt="xl"
          >
            Get back to home page
          </Button>
        </div>
      </SimpleGrid>
    </Container>
  );
}
