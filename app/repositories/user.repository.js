import db from "../infra/connect.database.js"

const search_users = () => {

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
export default search_users


