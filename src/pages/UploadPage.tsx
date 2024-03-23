import React, { useRef, useState } from "react";
import {
  Button,
  Checkbox,
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

interface FormValues {
  githubURL: string;
  title: string;
  description: string;
  tags: string[];
  genres: string[];
  access: string;
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
  const [coverImage, setCoverImage] = useState<FileWithPath[]>([]);
  const [screenshots, setScreenshots] = useState<FileWithPath[]>([]);

  const theme = useMantineTheme();

  const form = useForm<FormValues>({
    initialValues: {
      githubURL: "",
      title: "",
      description: "",
      tags: [],
      genres: [],
      access: "",
      termsOfService: [],
    },

    validate: {
      githubURL: (value) =>
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
          value
        )
          ? null
          : "Invalid URL",
      title: (value) => (value.trim() ? null : "Title is required"),
      description: (value) => (value.trim() ? null : "Description is required"),
      genres: (value) =>
        value.length > 0 ? null : "At least 1 genre is required",
    },
  });

  const formItemsText = [
    {
      withAsterisk: true,
      label: "Title",
      placeholder: "My awesome game",
      id: "title",
      ...form.getInputProps("title"),
    },
    {
      withAsterisk: true,
      label: "Github URL",
      placeholder: "https://github.com/username/repo",
      id: "githubURL",
      ...form.getInputProps("githubURL"),
    },
    {
      withAsterisk: true,
      label: "Short description",
      placeholder: "This game is awesome because...",
      id: "description",
      ...form.getInputProps("description"),
    },
  ];

  return (
    <Paper shadow="xs" p="xl">
      <h2>Upload a new project</h2>
      <form
        onSubmit={form.onSubmit((values) =>
          console.log({ ...values, coverImage, screenshots })
        )}
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
              label="Your game's genre(s)"
              placeholder="Select at least 1 genre"
              data={Genres}
              onChange={(v) => form.setFieldValue("genres", v)}
              error={form.errors.genres}
            />

            <TagsInput
              label="Tags"
              placeholder="Enter tag(s)"
              pt="md"
              onChange={(v) => form.setFieldValue("tags", v)}
            />

            <Radio.Group
              name="access"
              label="Visibility and access"
              withAsterisk
              pt="md"
              {...form.getInputProps("access")}
            >
              <Group mt="xs">
                <Radio value="private" label="Private" />
                <Radio value="public" label="Public" />
              </Group>
            </Radio.Group>

            <Checkbox.Group pt="md" withAsterisk label="Terms and conditions">
              <Checkbox
                pt="md"
                required
                value="agree"
                label="I agree to sell my soul to the devil for this game to be published."
                {...form.getInputProps("termsOfService", { type: "checkbox" })}
              />
            </Checkbox.Group>

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </Grid.Col>
          <Grid.Col span={5}>
            <h5>Cover Image</h5>
            <p>Upload an image that represents your game.</p>
            <Dropzone
              onDrop={(files) => setCoverImage(files)}
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
              <Group justify="center">
                <Button>
                  Choose cover image
                </Button>
              </Group>
            </Dropzone>

            <h5 style={{ marginTop: 20 }}>Screenshots</h5>
            <p>Upload screenshots from gameplay. Recommended 3-5.</p>
            <Dropzone
              onDrop={(files) =>
                setScreenshots((prevScreenshots) => [
                  ...prevScreenshots,
                  ...files,
                ])
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
              <Button>
                Choose screenshots
              </Button>
            </Dropzone>
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  );
}
