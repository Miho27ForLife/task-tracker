const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json()); // allows us to parse JSON in requests

// Temporary in-memory "database"
let tasks = [];

// Routes

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// GET all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST a new task
app.post('/tasks', (req, res) => {
    const task = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };
    tasks.push(task);
    res.status(201).json(task);
});

// PATCH a task (toggle completed)
app.patch('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (task) {
        task.completed = !task.completed;
        res.json(task);
    } else {
        res.status(404).json({ error: "Task not found" });
    }
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.status(204).end();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

