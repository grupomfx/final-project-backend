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


export const insertNewProduct = (product) => {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO products (
                        name, 
                        description, 
                        price, 
                        unit,
                        image_url,
                        status,
                        category,
                        created_at,
                        updated_at) 
                    VALUES (?, ?, ?, ?, ? ,? ,? ,?, ?)`;

        let new_date = new Date()
        let created_at = new_date.toISOString()
        let updated_at = new_date.toISOString();

        let params = [product.name, product.description, product.price, product.unit, product.image_url, product.status, product.category, created_at, updated_at];

        db.run(sql, params, (err) => {
            if (err) {
                console.log(err.message);
                reject(err)
            } else {
                // Obtenha o ID do usuário recém-inserido
                db.get('SELECT last_insert_rowid() as id', (err, row) => {
                    if (err) {
                        console.error('Erro ao obter o ID do produto inserido:', err.message);
                        reject(err);
                    } else {
                        console.log(`Produto  inserido com sucesso, ID: ${row.id}`);
                        resolve({ id: row.id, ...product, created_at, updated_at });
                    }
                });
            }
        });
    });
};

