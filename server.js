const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];


app.get("/users", (req, res) => {
    res.json(users);
});

// dodaj użytkownika
app.post("/users", (req, res) => {

    const newUser = {
        id: Date.now(),
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };

    users.push(newUser);

    res.status(201).json({
        message: "Dodano użytkownika"
    });
});

app.put("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    for (let i = 0; i < users.length; i++) {

        if (users[i].id === id) {

            users[i].name = req.body.name;
            users[i].surname = req.body.surname;
            users[i].email = req.body.email;
            users[i].password = req.body.password;
            users[i].role = req.body.role;

            return res.json({
                message: "Użytkownik zaktualizowany"
            });
        }
    }

    res.status(404).json({
        message: "Nie znaleziono użytkownika"
    });
});

app.delete("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    users = users.filter(user => user.id !== id);

    res.json({
        message: "Użytkownik usunięty"
    });
});


app.listen(5000, () => {
    console.log("Serwer działa");
});
