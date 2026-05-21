import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import { AuthProvider } from "./context/AuthContext";

// --- Normal imports for all pages in src/pages ---
import Dashboard from "./pages/Dashboard";
import PeriodTracker from "./pages/PeriodTracker";
import Symptoms from "./pages/Symptoms";
import SymptomAnalyzer from "./pages/SymptomAnalyzer";
import Medications from "./pages/Medications";
import Community from "./pages/Community";
import QAHub from "./pages/QAHub";
import AnalysisResult from "./pages/AnalysisResult";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyPage from "./pages/VerifyPage";



export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes - standalone (no layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* All main routes wrapped in Layout */}
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="periodtracker" element={<PeriodTracker />} />
            <Route path="symptoms" element={<Symptoms />} />
            <Route path="symptomanalyzer" element={<SymptomAnalyzer />} />
            <Route path="medication" element={<Medications />} />
            <Route path="community" element={<Community />} />
            <Route path="qahub" element={<QAHub />} />
            <Route path="AnalysisResult" element={<AnalysisResult />} />
            <Route path="/verify" element={<VerifyPage />} />

            <Route path="post" element={<Post />} />
          </Route>

          <Route
            path="*"
            element={
              localStorage.getItem("token") ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/register" replace />
              )
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
