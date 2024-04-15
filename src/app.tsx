import React from "react";
import { AppShell } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@mantine/core/styles.css";
import '@mantine/carousel/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import { HomePage } from "./pages/HomePage";
import { ErrorPage } from "./pages/ErrorPage";
import { AuthProvider } from "./contexts/AuthProvider";
import { Navbar } from "./components/Navbar";
import { SettingsPage } from "./pages/SettingsPage";
import { StorePage } from "./pages/StorePage";
import { LibraryPage } from "./pages/LibraryPage";
import { UploadPage } from "./pages/UploadPage";
import { GamePage } from "./pages/GamePage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppShell
          navbar={{
            width: 100,
            breakpoint: 0
          }}
        >
          <AppShell.Navbar>
            <Navbar />
          </AppShell.Navbar>
          <AppShell.Main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hjem" element={<HomePage />} />
              <Route path="/butik" element={<StorePage />} />
              <Route path="/bibliotek" element={<LibraryPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/indstillinger" element={<SettingsPage />} />
              <Route path="/game/:id" element={<GamePage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </Router>
    </AuthProvider>
  );
}