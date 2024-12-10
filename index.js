const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const DB_FILE = './db.json';

const readDB = () => {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data || '[]');
};

const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

app.get('/users', (req, res) => {
    const users = readDB();
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const users = readDB();
    const user = users.find((u) => u.id === parseInt(req.params.id, 10));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

app.post('/users', (req, res) => {
    const users = readDB();
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        ...req.body,
    };
    users.push(newUser);
    writeDB(users);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const users = readDB();
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id, 10));
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

    users[userIndex] = { ...users[userIndex], ...req.body };
    writeDB(users);
    res.json(users[userIndex]);
});

app.delete('/users/:id', (req, res) => {
    const users = readDB();
    const updatedUsers = users.filter((u) => u.id !== parseInt(req.params.id, 10));
    if (users.length === updatedUsers.length) {
        return res.status(404).json({ error: 'User not found' });
    }
    writeDB(updatedUsers);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
