import { Container, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { addTodo, deleteTodo, editTodo } from "./redux/todosSlice";

function App() {
  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  const handleAddTodo = (todo) => {
    dispatch(addTodo(todo));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (updatedTodo) => {
    dispatch(editTodo(updatedTodo));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        Todo App
      </Typography>
      <TodoForm onSaveTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onEditTodo={handleEditTodo}
      />
    </Container>
  );
}

export default App;
