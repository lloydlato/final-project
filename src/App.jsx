import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./providers/AuthProvider.jsx";
import Navbar from "./components/Navbar.jsx";

import Landing from "./pages/Landing.jsx";
import StudentsPage from "./pages/StudentsPage.jsx";
import SubjectsPage from "./pages/SubjectsPage.jsx";
import GradesPage from "./pages/GradesPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Toaster position="top-right" />
        <div className="min-h-screen bg-indigo-950 text-white p-6">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/grades" element={<GradesPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
