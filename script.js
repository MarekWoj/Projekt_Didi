let users = [];
let editId = null;

function showPage(id) {

    let pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

showPage("dashboard");


getUsers();


let form = document.getElementById("userForm");

form.addEventListener("submit", async function(e) {

    e.preventDefault();

    let user = {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };


    if (editId != null) {

        await fetch("http://localhost:5000/users/" + editId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        alert("Użytkownik edytowany");

        editId = null;

    } else {

        await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        alert("Dodano użytkownika");
    }

    form.reset();

    getUsers();

    showPage("users");
});


async function getUsers() {

    let response = await fetch("http://localhost:5000/users");

    users = await response.json();

    let tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    for (let i = 0; i < users.length; i++) {

        tbody.innerHTML += `
            <tr>
                <td>${users[i].name} ${users[i].surname}</td>
                <td>${users[i].email}</td>
                <td>${users[i].role}</td>
                <td>
                    <button onclick="editUser(${users[i].id})">
                        Edit
                    </button>

                    <button onclick="deleteUser(${users[i].id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    }

    document.getElementById("totalUsers").innerText = users.length;

    let admins = users.filter(function(user) {
        return user.role == "admin";
    });

    document.getElementById("totalAdmins").innerText = admins.length;

    document.getElementById("activeUsers").innerText = users.length;
}


async function deleteUser(id) {

    let question = confirm("Czy usunąć użytkownika?");

    if (question) {

        await fetch("http://localhost:5000/users/" + id, {
            method: "DELETE"
        });

        getUsers();
    }
}


function editUser(id) {

    let user = users.find(function(u) {
        return u.id == id;
    });

    if (!user) {
        return;
    }

    editId = id;

    document.getElementById("name").value = user.name;
    document.getElementById("surname").value = user.surname;
    document.getElementById("email").value = user.email;
    document.getElementById("password").value = user.password;
    document.getElementById("role").value = user.role;

    showPage("add-user");
}
