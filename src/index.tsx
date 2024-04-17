import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  primaryColor: window.localStorage.getItem("mantine-color-scheme") || "blue",
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
