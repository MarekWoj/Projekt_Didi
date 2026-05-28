const express = require('express');

const {
    createUser,
    readUsers,
    updateUser,
    deleteUser
} = require('./crud');

const app = express();

app.use(express.json());


app.get('/users', (req, res) => {
    readUsers((err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(rows);
        }
    });
});

app.post('/users', (req, res) => {
    const { name, surname, email, password, role } = req.body;

    createUser(name, surname, email, password, role, (err, data) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).json({
                message: "User added",
                id: data.id
            });
        }
    });
});


app.put('/users/:id', (req, res) => {
    const { name, surname, email, password, role } = req.body;

    updateUser(
        req.params.id,
        name,
        surname,
        email,
        password,
        role,
        (err, data) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.status(200).json({
                    message: "User updated",
                    changes: data.changes
                });
            }
        }
    );
});


app.delete('/users/:id', (req, res) => {
    deleteUser(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json({
                message: "User deleted",
                changes: data.changes
            });
        }
    });
});


app.listen(5000, () => {
    console.log("GymFlow server running on port 5000");
});
