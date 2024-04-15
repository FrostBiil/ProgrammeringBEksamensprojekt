import React, { useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  Grid,
  Group,
  MultiSelect,
  Paper,
  Radio,
  TagsInput,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { ImageConverter } from "../utils/imageConverter";
import { Api } from "../utils/api";

interface FormValues {
  projectUrl: string;
  title: string;
  description: string;
  tags: string[];
  genres: string[];
  visibility: string;
  termsOfService: boolean[];
}

const Genres = [
  "Action",
  "Adventure",
  "Casual",
  "Indie",
  "Massively Multiplayer",
  "Racing",
  "RPG",
  "Simulation",
  "Sports",
  "Strategy",
];

export function UploadPage() {
  const [cover, setCoverImage] = useState<string | undefined>(undefined);
  const [screenshots, setScreenshots] = useState<string[]>([]);

  const theme = useMantineTheme();

  const form = useForm<FormValues>({
    initialValues: {
      projectUrl: "",
      title: "",
      description: "",
      tags: [],
      genres: [],
      visibility: "",
      termsOfService: [],
    },

    validate: {
      projectUrl: (value) =>
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
          value
        )
          ? null
          : "Ugyldig URL",
      title: (value) => (value.trim() ? null : "Titel er påkrævet"),
      description: (value) => (value.trim() ? null : "Beskrivelse er påkrævet"),
      genres: (value) =>
        value.length > 0 ? null : "Mindst 1 genre er påkrævet",
      visibility: (value) =>
        ["Private", "Public"].includes(value)
          ? null
          : "Vælg venligst visibilitet",
    },
  });

  const formItemsText = [
    {
      withAsterisk: true,
      label: "Titel",
      placeholder: "Mit fede spil",
      id: "title",
      ...form.getInputProps("title"),
    },
    {
      withAsterisk: true,
      label: "Project URL",
      placeholder: "https://github.com/username/repo",
      id: "projectUrl",
      ...form.getInputProps("projectUrl"),
    },
    {
      withAsterisk: true,
      label: "Kort beskrivelse",
      placeholder: "Dette spil er fedt, fordi...",
      id: "description",
      ...form.getInputProps("description"),
    },
  ];

  return (
    <Container mt={"xl"}>
      <Paper shadow="md" p="xl">
        <h2>Upload et nyt projekt</h2>
        <form
          onSubmit={form.onSubmit((values) => {
            if (!cover) {
              alert("Vælg venligst et frontbillede");
              return;
            }
            if (screenshots.length === 0) {
              alert("Vælg venligst mindst et skærmbillede");
              return;
            }

            Api.publishGame({ ...values, cover, screenshots });
          })}
        >
          <Grid>
            <Grid.Col span={7}>
              {formItemsText.map((props) => (
                <TextInput
                  pt="md"
                  {...props}
                  onChange={(v) => form.setFieldValue(props.id, v.target.value)}
                />
              ))}

              <MultiSelect
                pt="md"
                withAsterisk
                label="Dit spil's genre"
                placeholder="Vælg mindst 1 genre"
                data={Genres}
                onChange={(v) => form.setFieldValue("genres", v)}
                error={form.errors.genres}
              />

              <TagsInput
                label="Tags"
                placeholder="Skriv tag(s)"
                pt="md"
                onChange={(v) => form.setFieldValue("tags", v)}
              />

              <Radio.Group
                name="visibility"
                label="Visibilitet"
                withAsterisk
                pt="md"
                {...form.getInputProps("visibility")}
              >
                <Group mt="xs">
                  <Radio value="Private" label="Privat" />
                  <Radio value="Public" label="Offenlig" />
                </Group>
              </Radio.Group>

              <Checkbox.Group pt="md" withAsterisk label="Vilkår og betingelser">
                <Checkbox
                  pt="md"
                  required
                  value="agree"
                  label="Jeg accepterer at sælge min sjæl til djævelen for at dette spil kan udgives."
                  {...form.getInputProps("termsOfService", { type: "checkbox" })}
                />
              </Checkbox.Group>

              <Group justify="flex-end" mt="md">
                <Button type="submit">Udgiv</Button>
              </Group>
            </Grid.Col>
            <Grid.Col span={5}>
              <h5>Frontbillede</h5>
              <p>Opload et billede der repræsentere dit spil</p>
              <Dropzone
                onDrop={(files) =>
                  ImageConverter.convertImageToBase64(files[0]).then((encoded) =>
                    setCoverImage(encoded)
                  )
                }
                accept={IMAGE_MIME_TYPE}
                style={{
                  height: 150,
                  borderColor: "lightgrey",
                  borderStyle: "dotted",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cover ? (
                  <img
                    src={cover}
                    style={{
                      width: 150,
                      height: 150,
                      objectFit: "cover",
                      borderRadius: theme.radius.sm,
                    }}
                  />
                ) : (
                  <Button>Vælg frontbillede</Button>
                )}
              </Dropzone>

              <h5 style={{ marginTop: 20 }}>Skærmbilleder</h5>
              <p>Opload skærmbilleder fra spillet. Anbefalet 3-5.</p>
              <Dropzone
                onDrop={(files) =>
                  Promise.all(
                    files.map((file) => ImageConverter.convertImageToBase64(file))
                  ).then(setScreenshots)
                }
                accept={IMAGE_MIME_TYPE}
                multiple
                style={{
                  height: 150,
                  borderColor: "lightgrey",
                  borderStyle: "dotted",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {screenshots.length != undefined ? (
                  <Group>
                    {" "}
                    {screenshots.map((screenshot) => (
                      <img
                        src={screenshot}
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: theme.radius.sm,
                        }}
                      />
                    ))}
                  </Group>
                ) : (
                  <Button>Vælg skærmbilleder</Button>
                )}
              </Dropzone>
            </Grid.Col>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
