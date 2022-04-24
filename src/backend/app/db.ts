import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();


export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rSq!!2007",
    database: "tubes3"
});