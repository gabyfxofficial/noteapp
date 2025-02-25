import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { addNote, updateNote } from "../store/notesSlice";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteFromStore = useSelector((state) =>
    state.notes.find((note) => note.id === parseInt(id))
  );
  const isNew = !id;
  const [note, setNote] = useState({ title: "", content: "" });

  useEffect(() => {
    if (!isNew && noteFromStore) {
      setNote(noteFromStore);
    }
  }, [id, isNew, noteFromStore]);

  const handleSave = () => {
    if (isNew) {
      const newNote = { ...note, id: Date.now() };
      dispatch(addNote(newNote));
    } else {
      dispatch(updateNote(note));
    }
    navigate("/");
  };

  return (
    <>
      <style>
        {`
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
            onClick={() => navigate("/")}
            sx={{ color: "#fff" }}
            disableRipple
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              flex: 1,
              textAlign: "center",
              fontWeight: 700,
              background: "linear-gradient(90deg, #008ba3, #00bcd4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "fadeIn 0.8s ease-out",
            }}
          >
            {isNew ? "Create New Note" : "Edit Note"}
          </Typography>
          {!isNew && (
            <IconButton
              onClick={() => navigate(`/view/${note.id}`)}
              sx={{ color: "#fff" }}
              disableRipple
            >
              <VisibilityIcon />
            </IconButton>
          )}
        </Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            animation: "fadeIn 0.8s ease-out",
          }}
        >
          <TextField
            fullWidth
            label="Title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={6}
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            variant="outlined"
          />
          <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default EditNote;
