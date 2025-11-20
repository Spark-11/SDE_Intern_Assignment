const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const FILE_PATH = "./todos.json";

// Helper function to read file
function readTodos() {
  const data = fs.readFileSync(FILE_PATH, "utf8");
  return JSON.parse(data);
}

// Helper function to write file
function writeTodos(todos) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
}

// ------------------ APIs -------------------

// GET all todos
app.get("/todos", (req, res) => {
  const todos = readTodos();
  res.status(200).json({
    success: true,
    data: todos
  });
});

// POST create a todo
app.post("/todos", (req, res) => {
  const { title, completed } = req.body;

  // Input validation
  if (!title || typeof title !== "string") {
    return res.status(400).json({
      success: false,
      message: "Title is required and must be a string"
    });
  }

  const todos = readTodos();

  const newTodo = {
    id: Date.now(),
    title,
    completed: completed || false
  };

  todos.push(newTodo);
  writeTodos(todos);

  res.status(201).json({
    success: true,
    data: newTodo
  });
});

// PUT update a todo
app.put("/todos/:id", (req, res) => {
  const todoId = Number(req.params.id);
  const { title, completed } = req.body;

  const todos = readTodos();
  const todoIndex = todos.findIndex((t) => t.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Todo not found"
    });
  }

  if (title !== undefined) {
    if (typeof title !== "string") {
      return res.status(400).json({
        success: false,
        message: "Title must be a string"
      });
    }
    todos[todoIndex].title = title;
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Completed must be boolean"
      });
    }
    todos[todoIndex].completed = completed;
  }

  writeTodos(todos);

  res.status(200).json({
    success: true,
    data: todos[todoIndex]
  });
});

// DELETE a todo
app.delete("/todos/:id", (req, res) => {
  const todoId = Number(req.params.id);

  const todos = readTodos();
  const newTodos = todos.filter((t) => t.id !== todoId);

  if (newTodos.length === todos.length) {
    return res.status(404).json({
      success: false,
      message: "Todo not found"
    });
  }

  writeTodos(newTodos);

  res.status(200).json({
    success: true,
    message: "Todo deleted successfully"
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});