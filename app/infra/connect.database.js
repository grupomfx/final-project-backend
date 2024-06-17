import path from 'path';
import sqlite3 from "sqlite3"

const dbPath = path.resolve(process.cwd(), 'app/infra/local.database.db');


const db = new sqlite3.Database(dbPath, (err) => {

    if (err) throw err

    console.log('Connect database success !!')
})

export default db
