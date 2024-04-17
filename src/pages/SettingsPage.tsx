import React, { useContext } from "react";
import {
  useMantineTheme,
  Group,
  ColorSwatch,
  Paper,
  Container,
  Flex,
  Tooltip,
  Button,
  Divider,
} from "@mantine/core";
import { Api } from "../utils/api";
import { AuthContext } from "../contexts/AuthProvider";

export function SettingsPage() {
  const theme = useMantineTheme();
  const { user } = useContext(AuthContext);

  return (
    <>
      <Container mt={"xl"}>
        <Paper withBorder shadow={"md"} p={"md"}>
          <h3>Indstilinger</h3>

          <Flex direction={"column"}>
            <h4>Tema</h4>
            <Group>
              {Object.keys(theme.colors).map((color) => (
                <Tooltip key={color} label={color}>
                  <ColorSwatch
                    color={theme.colors[color][theme.primaryShade as number]}
                    onClick={() => {
                      window.localStorage.setItem(
                        "mantine-color-scheme",
                        color
                      );
                      // eslint-disable-next-line no-restricted-globals
                      location.reload();
                    }}
                  />
                </Tooltip>
              ))}
            </Group>

            <Divider mt={"xl"} />

            {user && (
              <Button
                mt={"xl"}
                fullWidth
                color={"red"}
                variant="outline"
                onClick={() => {
                  if (
                    // eslint-disable-next-line no-restricted-globals
                    !confirm(
                      "Er du sikker på at du vil slette din konto og alle de spil du har udgivet? Dette kan ikke fortrydes ⚠️"
                    )
                  )
                    return;

                  console.warn("Sletter konto");

                  Api.deleteUser();
                }}
              >
                Slæt konto
              </Button>
            )}
          </Flex>
        </Paper>
      </Container>
    </>
  );
}
