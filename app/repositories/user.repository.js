import db from "../infra/connect.database.js"

export const searchUsers = () => {

    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users`;

        db.all(sql, [], (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                console.log(row);
                // resolve with row.author or null
                resolve(row);
            }
        });
    });
}

export const searchUserById = (userId) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users where id=${userId}`;
        db.get(sql, [], (err, row) => {
            if (err) {
                console.log(err.message);
                reject(err)
            } else {
                //console.log(row);
                resolve(row === undefined ? {} : row);
            }
        })
    })
}

export const searchUserLikeName = (nameSeachLike) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users where name LIKE '%${nameSeachLike}%'`;
        db.all(sql, [], (err, row) => {
            if (err) {
                console.log(err.message);
                reject(err)
            } else {
                //console.log(row);
                resolve(row === undefined ? [] : row);
            }
        })
    })
}

export const insertNewUser = (user) => {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO users (name, email) VALUES (?, ?)`;
        let params = [user.name, user.email];

        db.run(sql, params, (err) => {
            if (err) {
                console.log(err.message);
                reject(err)
            } else {
                // Obtenha o ID do usuário recém-inserido
                db.get('SELECT last_insert_rowid() as id', (err, row) => {
                    if (err) {
                        console.error('Erro ao obter o ID do usuário inserido:', err.message);
                        reject(err);
                    } else {
                        console.log(`Usuário inserido com sucesso, ID: ${row.id}`);
                        resolve({ id: row.id, ...user });
                    }
                });
            }
        });
    });
};


export const updateUserById = (userId, userData) => {

    return new Promise((resolve, reject) => {
        let sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
        let params = [userData.name, userData.email, userId];

        db.run(sql, params, function(err) {
            if (err) {
                console.error('Erro ao atualizar usuário no banco de dados:', err.message);
                reject(err);
            } else {
                // Check if any rows were affected by the update
                if (this.changes === 0) {
                    // If no rows were affected, reject with an error indicating user not found
                    reject({ message: 'Usuário não encontrado', status: 404 });
                } else {
                    // Resolve with the updated user data
                    resolve({ id: userId, ...userData });
                }
            }
        });
    });
};



