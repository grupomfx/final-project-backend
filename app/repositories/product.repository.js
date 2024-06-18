import db from "../infra/connect.database.js"



export const searchProductsLikeName = (searchName, pageNumber, pageSize) => {
    return new Promise((resolve, reject) => {
        console.log(searchName)
        const startIndex = (pageNumber - 1) * pageSize;
        let sql = `SELECT * FROM products where name LIKE '%${searchName}%' LIMIT ${pageSize} OFFSET ${startIndex}`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.log(err.message);
                reject(err)
            } else {
                let countSql = `SELECT COUNT(*) AS total FROM products WHERE name LIKE '%${searchName}%'`;
                db.get(countSql, [], (err, countRow) => {
                    if (err) {
                        console.log(err.message);
                        reject(err);
                    } else {
                        const totalResults = countRow.total;
                        const totalPages = Math.ceil(totalResults / pageSize);

                        // Montar o objeto de resposta com as informações de paginação
                        const response = {
                            totalPages: totalPages,
                            pageSize: totalResults,
                            pageNumber: pageNumber,
                            products: rows === undefined ? [] : rows
                        };

                        resolve(response);
                    }
                });
            }
        });
    });
};
