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

// Componentă pentru a preveni accesul la pagina de login dacă utilizatorul este logat
const RedirectIfAuthenticated = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : children;
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
            {/* Dacă utilizatorul este logat, îl redirecționează automat spre Home */}
            <Route
              path="/login"
              element={
                <RedirectIfAuthenticated>
                  <Login />
                </RedirectIfAuthenticated>
              }
            />
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
            {/* Redirecționare implicită spre Home dacă ruta nu este găsită */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
        {showHeaderAndFooter && <Footer />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
