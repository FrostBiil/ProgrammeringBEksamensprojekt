import React from "react";
import { createTheme, MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@mantine/core/styles.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NavbarSearch from "./components/NavbarSearch";
import ErrorPage from "./pages/ErrorPage";
import { AuthProvider } from "./contexts/AuthProvider";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <AuthProvider>
        <Router>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 1 }}>
              <NavbarSearch />
            </div>
            <div style={{ flex: 3 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
