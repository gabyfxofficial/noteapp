import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = useSelector((state) =>
    state.notes.find((note) => note.id === parseInt(id))
  );

  if (!note) {
    return (
      <Container sx={{ mt: 6, p: 4, color: "#fff" }}>
        <Typography variant="h5">Notă nu a fost găsită</Typography>
      </Container>
    );
  }

  return (
    <>
      <style>
        {`
          @media (pointer: coarse) {
            .no-move:hover {
              transform: none !important;
              box-shadow: none !important;
            }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <Container
        sx={{
          mt: 6,
          p: 4,
          borderRadius: 2,
          background: "rgba(29, 32, 37, 0.75)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          animation: "fadeIn 0.8s ease-out",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            animation: "fadeIn 0.8s ease-out",
          }}
        >
          <IconButton
            disableRipple
            onClick={() => navigate("/")}
            sx={{ color: "#fff" }}
            className="no-move"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            sx={{
              flex: 1,
              textAlign: "center",
              fontWeight: 700,
              background: "linear-gradient(90deg, #008ba3, #00bcd4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {note.title}
          </Typography>
          <IconButton
            disableRipple
            onClick={() => navigate(`/edit/${note.id}`)}
            sx={{ color: "#fff" }}
            className="no-move"
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Typography
          variant="body1"
          sx={{ color: "#fff", mt: 2, animation: "fadeIn 0.8s ease-out" }}
        >
          {note.content}
        </Typography>
      </Container>
    </>
  );
};

export default ViewNote;
