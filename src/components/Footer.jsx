// src/components/Footer.jsx
import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: "rgba(13, 27, 42, 0.85)",
      py: 3,
      mt: 4,
      textAlign: "center",
    }}
  >
    <Container maxWidth="lg">
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Note App. All rights reserved.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
