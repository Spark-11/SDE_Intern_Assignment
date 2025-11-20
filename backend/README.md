# Simple To-Do CRUD API (Node.js + Express)

## 🚀 Project Overview
This is a simple REST API for managing To-Do items using a JSON file as storage.

## Live Link
https://backend-task-um9x.onrender.com

## 📌 Features
- Create, Read, Update, Delete To-Dos
- Stores data in `todos.json` (no database)
- Input validation included
- `completed: true/false` field supported

---

## 📡 API Endpoints

### 1. Get all todos
GET `/todos`

### 2. Create a new todo
POST `/todos`
```json
{
  "title": "Buy milk",
  "completed": false
}
```
### 3. Update todos
PUT `/todos/:id`
```json
{
  "title": "Buy milk",
  "completed": true
}
```
### 4. Delete todo
DELETE ``/todos/:id`

---

Note : Use the live link and the given routes.
For example : 
```bash
https://backend-task-um9x.onrender.com/todos
```