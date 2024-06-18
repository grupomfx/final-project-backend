import db from "../infra/connect.database.js"



export const searchProductsLikeName = (nameSeachLike) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM products where name LIKE '%${nameSeachLike}%'`;
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

