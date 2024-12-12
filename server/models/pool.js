const { Pool } = require("pg")
// require("dotenv").config()

module.exports = new Pool({
    host: "localhost",
    user: "quangu",
    database: "instagram",
    password: "2684226",
})