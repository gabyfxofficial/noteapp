// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2196f3", // Albastru vibrant
      dark: "#1976d2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#64b5f6", // Accente albastru deschis
      dark: "#42a5f5",
      contrastText: "#ffffff",
    },
    background: {
      default: "#0d1b2a", // Fundal în tonuri de albastru închis
      paper: "rgba(33, 150, 243, 0.1)", // Efect subtil de transparență
    },
  },
  typography: {
    // Suprascriem fontul implicit cu fontul dorit (Inter în acest exemplu)
    fontFamily: "Inter, sans-serif",
    h1: { fontWeight: 700, fontSize: "3rem" },
    h2: { fontWeight: 700, fontSize: "2.5rem" },
    h3: { fontWeight: 700, fontSize: "2rem" },
    body1: { fontWeight: 400, fontSize: "1rem" },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #2196f3, #64b5f6)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 16,
          transition: "background-color 0.3s ease, transform 0.3s ease",
          backgroundColor: "#2196f3",
          "&:hover": {
            backgroundColor: "#1976d2",
            transform: "scale(1.05)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(33, 150, 243, 0.1)",
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: "rgba(13, 27, 42, 0.85)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.6)",
          },
        },
      },
    },
  },
});

export default theme;
