// src/pages/Home.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { deleteNote } from "../store/notesSlice";

const Home = () => {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/view/${id}`);
  };

  return (
    <>
      {/* Stiluri pentru animație */}
      <style>
        {`
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
      <Container
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          background: "rgba(29, 32, 37, 0.75)",
          backdropFilter: "blur(8px)",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.6)",
          animation: "popIn 0.8s ease-out",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: "linear-gradient(90deg, #008ba3, #00bcd4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            mb: 4,
            animation: "popIn 0.8s ease-out",
          }}
        >
          List of Notes
        </Typography>
        <List>
          {notes.map((note) => (
            <Box
              key={note.id}
              onClick={() => handleCardClick(note.id)}
              sx={{
                mb: 3,
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "rgba(29, 32, 37, 0.85)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                animation: "popIn 0.5s ease-out",
                "@media (hover: hover)": {
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                  },
                },
                "@media (pointer: coarse)": {
                  "&:hover": {
                    transform: "none",
                    boxShadow: "none",
                  },
                },
              }}
            >
              <ListItem
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  animation: "popIn 0.5s ease-out",
                }}
              >
                <ListItemText
                  primary={note.title}
                  secondary={note.content.substring(0, 50) + "..."}
                  primaryTypographyProps={{
                    sx: { fontWeight: 600, color: "#008ba3" },
                  }}
                  secondaryTypographyProps={{
                    sx: { color: "#aaa", fontStyle: "italic" },
                  }}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/view/${note.id}`);
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(0,188,212,0.2)",
                        "& svg": { color: "#fff" },
                      },
                    }}
                  >
                    <VisibilityIcon sx={{ color: "#fff" }} />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit/${note.id}`);
                    }}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(255,152,0,0.2)" },
                    }}
                  >
                    <EditIcon sx={{ color: "#ff9800" }} />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteNote(note.id));
                    }}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(244,67,54,0.2)" },
                    }}
                  >
                    <DeleteIcon sx={{ color: "#f44336" }} />
                  </IconButton>
                </Box>
              </ListItem>
              <Divider sx={{ borderColor: "#444" }} />
            </Box>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Home;
