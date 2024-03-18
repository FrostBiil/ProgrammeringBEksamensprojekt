import React from "react";
import {
  Button,
  Checkbox,
  Group,
  Input,
  MultiSelect,
  Paper,
  TagsInput,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Genre } from "@prisma/client";

const Genres = [
  "Action",
  "Adventure",
  "Casual",
  "Indie",
  "MassivelyMultiplayer",
  "Racing",
  "RPG",
  "Simulation",
  "Sports",
  "Strategy",
];

export function UploadPage() {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      githubURL: "",
      title: "",
      description: "",
      tags: [] as string[], //TagsInput
      genres: [] as Genre[], //Multiselect
      cover: "",
      screenshots: [],
    },

    validate: {
      githubURL: (value) => {
        const urlPattern =
          /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
        return urlPattern.test(value) ? null : "Invalid URL";
      },
      title: (value) => {
        return value.trim() ? null : "Title is required";
      },
      description: (value) => {
        return value.trim() ? null : "Description is required";
      },
      genres: (value) => {
        return value.length > 0 ? null : "At least 1 genre is required";
      },
      cover: (value) => {
        return value.trim() ? null : "Cover is required";
      },
      screenshots: (value) => {
        return Array.isArray(value) &&
          value.every((screenshot) => typeof screenshot === "string")
          ? null
          : "At least 1 screenshot is required";
      },
    },
  });

  const formItemsText = [
    {
      withAsterisk: true,
      label: "Github URL",
      placeholder: "https://github.com/username/repo",
      id: "githubURL",
      ...form.getInputProps("githubURL"),
    },
    {
      withAsterisk: true,
      label: "Title",
      placeholder: "My awesome game",
      id: "title",
      ...form.getInputProps("title"),
    },
    {
      withAsterisk: true,
      label: "Description",
      placeholder: "This game is awesome because...",
      id: "description",
      ...form.getInputProps("description"),
    },
    {
      withAsterisk: true,
      label: "Cover",
      placeholder: "https://example.com/cover.jpg",
      id: "cover",
      ...form.getInputProps("cover"),
    },
  ];

  return (
    <Paper shadow="xs" p="xl">
      <h2>Opload et nyt projekt</h2>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        {formItemsText.map((props) => (
          <TextInput
            pt="md"
            {...props}
            onChange={(v) => {
              if (props.id) form.setFieldValue(props.id, v.target.value);
            }}
          />
        ))}
        <MultiSelect
          pt="md"
          label="Your game's genre(s)"
          placeholder={
            form.values.genres.length > 0 ? "" : "Select at least 1 genre"
          }
          data={Genres}
          onChange={(v) => {
            form.setFieldValue("genres", v as Genre[]);
          }}
          error={form.errors.genres} // Display the validation error message if any
        />
        <TagsInput
          label="Press Enter to submit a tag"
          placeholder="Enter tag(s)"
          pt="md"
          onChange={(v) => {
            form.setFieldValue("tags", v as string[]);
            console.log(form.values.tags);
          }}
        />
        <Checkbox
          pt="md"
          required
          label="I agree to sell my soul to the devil for this game to be published."
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Paper>
  );
}
