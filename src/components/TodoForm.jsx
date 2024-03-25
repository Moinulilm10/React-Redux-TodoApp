import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Proptypes from "prop-types";
import { useState } from "react";

const TodoForm = ({ onSaveTodo }) => {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    id: Date.now(),
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTodo({
      title: "",
      description: "",
      id: Date.now(),
    });
    setErrors({
      title: "",
      description: "",
    });
  };

  const handleSave = () => {
    const errors = {};
    if (!todo.title.trim()) {
      errors.title = "Title is required";
    }
    if (!todo.description.trim()) {
      errors.description = "Description is required";
    }

    if (Object.keys(errors).length === 0) {
      onSaveTodo(todo);
      setTodo({
        title: "",
        description: "",
        id: Date.now(),
      });
      handleClose();
    } else {
      setErrors(errors);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginBottom: "2rem" }}
      >
        Add Todo
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Todo</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={todo.title}
            error={!!errors.title}
            helperText={errors.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <TextField
            required
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            minRows={4}
            value={todo.description}
            error={!!errors.description}
            helperText={errors.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

TodoForm.propTypes = {
  onSaveTodo: Proptypes.func,
  todoEdit: Proptypes.object,
};

export default TodoForm;
