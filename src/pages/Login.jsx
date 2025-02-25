// src/pages/Login.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      // Stochează token-ul și navighează spre pagina principală
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      setErrorOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setErrorOpen(false);
  };

  return (
    <>
      {/* Bloc de stil pentru animații și efecte */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          /* Efect de focus/hover pentru input-uri și buton (pe dispozitive cu hover) */
          .custom-input:hover, .custom-input:focus {
            transform: scale(1.02);
            transition: transform 0.2s ease;
          }
          .custom-button:hover {
            transform: scale(1.02);
            transition: transform 0.2s ease;
          }
          /* Pe dispozitive mobile (pointer: coarse) dezactivăm efectele de hover */
          @media (pointer: coarse) {
            .custom-input:hover, .custom-input:focus,
            .custom-button:hover {
              transform: none !important;
            }
          }
        `}
      </style>
      <Container
        ref={containerRef}
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          position: "relative",
          animation: "fadeInUp 0.8s ease-out",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            p: 4,
            bgcolor: "rgba(29, 32, 37, 0.75)",
            borderRadius: 2,
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            textAlign: "center",
            animation: "fadeInUp 0.8s ease-out",
          }}
        >
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
            Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2, bgcolor: "#1e1e1e", borderRadius: 1 }}
            InputProps={{ className: "custom-input" }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2, bgcolor: "#1e1e1e", borderRadius: 1 }}
            InputProps={{ className: "custom-input" }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="custom-button"
            sx={{
              mt: 2,
              bgcolor: "primary.main",
              color: "white",
              padding: "12px",
              borderRadius: 2,
              transition: "background-color 0.3s ease",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Login
          </Button>
        </Box>
        <Snackbar
          open={errorOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          container={containerRef.current}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
            variant="filled"
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Login;
