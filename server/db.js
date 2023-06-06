const Pool = require('pg').Pool;
require('dotenv').config();

//.env를 사용해서 변경 가능
//const pool = new Pool({
//    host: "localhost",
//    user: "planka",
//    port: 5432,
//    password: "planka",
//    database: "planka"
//})

const pool = new Pool({
    host: process.env.MYHOST,
    user: process.env.MYUSERNAME,
    port: process.env.MYDBPORT,
    password: process.env.MYPASSWORD,
    database: process.env.MYDATABASE
})
module.exports = pool;