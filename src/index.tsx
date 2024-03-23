import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { MantineProvider, createTheme } from "@mantine/core";
import '@mantine/carousel/styles.css';

const theme = createTheme({
  primaryColor: "blue",
  primaryShade: 7,
});

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
