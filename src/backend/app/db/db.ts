import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();


export const db = mysql.createConnection({
    host: "remotemysql.com",
    user: "hWlcM5nsT1",
    password: "6talWDyWzq",
    database: "hWlcM5nsT1"
});