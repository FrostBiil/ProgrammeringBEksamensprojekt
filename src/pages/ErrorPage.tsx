import React from "react";
import { Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import classes from './ErrorPage.module.css';

function goToHome() {
    window.location.href = '/';
}

export function ErrorPage() {
    return (
        <Container className={classes.root}>
          <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
            <div>
              <Title className={classes.title}>Something is not right...</Title>
              <Text c="dimmed" size="lg">
                Page you are trying to open does not exist. You may have mistyped the address, or the
                page has been moved to another URL. If you think this is an error contact support.
              </Text>
              <Button onClick={goToHome} variant="outline" size="md" mt="xl" className={classes.control}>
                Get back to home page
              </Button>
            </div>
          </SimpleGrid>
        </Container>
      );
};