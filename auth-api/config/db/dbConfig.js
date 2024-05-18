import Client from "pg"

const clientPostgresDB = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

clientPostgresDB.connect().then(() => console.log("connected to database")).catch((err) => console.log(err))

export default clientPostgresDB