const { Client } = require("pg")
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users_test (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR ( 255 ),
   password VARCHAR ( 255 )
);
`

async function main(){
    console.log("seeding...");
    const client = new Client({
        user: "quangu",
        database: "instagram",
        password: "2684226",
    })

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("user test table created")
}

module.exports = main
