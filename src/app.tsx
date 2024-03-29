import React from "react";
import { AppShell } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@mantine/core/styles.css";
import { HomePage } from "./pages/HomePage";
import { ErrorPage } from "./pages/ErrorPage";
import { AuthProvider } from "./contexts/AuthProvider";
import { Navbar } from "./components/Navbar";
import { SettingsPage } from "./pages/SettingsPage";
import { StorePage } from "./pages/StorePage";
import { LibraryPage } from "./pages/LibraryPage";
import { UploadPage } from "./pages/UploadPage";

function App() {
  return (
    <AuthProvider>
      <AppShell
        padding={"md"}
        navbar={{
          width: 100,
          breakpoint: "sm",
        }}
      >
        <AppShell.Navbar>
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hjem" element={<HomePage />} />
              <Route path="/butik" element={<StorePage/>} />
              <Route path="/bibliotek" element={<LibraryPage/>} />
              <Route path="/opload" element={<UploadPage/>} />
              <Route path="/indstillinger" element={<SettingsPage/>} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Router>
        </AppShell.Main>
      </AppShell>
    </AuthProvider>
  );
}

export default App;
