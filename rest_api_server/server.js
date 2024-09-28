#!/usr/bin/env node

console.log(`Starting server code`)

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // for parsing JSON bodies

// Sample data
let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
];

// GET all users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET a single user by ID
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`Looking for user with id:`, id)
    const user = users.find(user => user.id === id);
    if (user) {
        console.log(`Found user with id:`, id, user)
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// POST a new user
app.post('/users', (req, res) => {
    console.log(`Body in post:`, req.body)
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    console.log(`Created new user:`, users.find(user => user.id === newUser.id))
    res.status(201).json(newUser.id);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
