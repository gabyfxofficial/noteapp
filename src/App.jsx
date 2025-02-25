import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Home from "./pages/Home";
import EditNote from "./pages/EditNote";
import ViewNote from "./pages/ViewNote";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import "bootstrap/dist/css/bootstrap.min.css";

// Componentă de protecție pentru rutele private
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const location = useLocation();
  const showHeaderAndFooter = location.pathname !== "/login";

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {showHeaderAndFooter && <Header />}
        <Box sx={{ flex: 1, pt: showHeaderAndFooter ? "70px" : 0 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view/:id"
              element={
                <ProtectedRoute>
                  <ViewNote />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditNote />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new"
              element={
                <ProtectedRoute>
                  <EditNote />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
        {showHeaderAndFooter && <Footer />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
