// components/TodoCard.js
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import EditNoteIcon from "@mui/icons-material/EditNote";
import Proptypes from "prop-types";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    transition: "transform 0.3s",
    cursor: "pointer",
    "&:hover": {
      boxShadow: `0 0 10px 3px ${theme.palette.primary.main}`,
      transform: "scale(1.02)",
    },
  },
  deleteButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const TodoCard = ({ todo, onDeleteTodo, onEditTodo }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [open, setOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState({
    ...todo,
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const classes = useStyles();

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({
      title: "",
      description: "",
    });
  };

  const handleSave = () => {
    const errors = {};
    if (!editedTodo.title.trim()) {
      errors.title = "Title is required";
    }
    if (!editedTodo.description.trim()) {
      errors.description = "Description is required";
    }
    if (Object.keys(errors).length === 0) {
      onEditTodo(editedTodo);
      handleClose();
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {todo.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{
              whiteSpace: "normal",
              maxHeight: showFullDescription ? "none" : "3em",
              overflow: "hidden",
              justifyContent: "stretch",
            }}
          >
            {todo.description}
          </Typography>
          {todo.description.length > 100 && (
            <IconButton onClick={handleToggleDescription}>
              {showFullDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
          <IconButton edge="end" aria-label="edit" onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDeleteTodo(todo.id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={editedTodo.title}
            error={!!errors.title}
            helperText={errors.title}
            required
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editedTodo.description}
            error={!!errors.description}
            helperText={errors.description}
            required
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

TodoCard.propTypes = {
  todo: Proptypes.object,
  onDeleteTodo: Proptypes.func,
  onEditTodo: Proptypes.func,
};

export default TodoCard;
