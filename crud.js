const db = require('./database');

const createUser = (name, surname, email, password, role, callback) => {
    const sql = `
        INSERT INTO users (name, surname, email, password, role)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(sql, [name, surname, email, password, role], function (err) {
        if (err) {
            return callback(err);
        }

        callback(null, { id: this.lastID });
    });
};


const readUsers = (callback) => {
    const sql = `SELECT * FROM users`;

    db.all(sql, [], (err, rows) => {
        callback(err, rows);
    });
};


const updateUser = (id, name, surname, email, password, role, callback) => {
    const sql = `
        UPDATE users 
        SET name = ?, surname = ?, email = ?, password = ?, role = ?
        WHERE id = ?
    `;

    db.run(sql, [name, surname, email, password, role, id], function (err) {
        if (err) {
            return callback(err);
        }

        callback(null, { changes: this.changes });
    });
};


const deleteUser = (id, callback) => {
    const sql = `DELETE FROM users WHERE id = ?`;

    db.run(sql, [id], function (err) {
        if (err) {
            return callback(err);
        }

        callback(null, { changes: this.changes });
    });
};


module.exports = {
    createUser,
    readUsers,
    updateUser,
    deleteUser
};
