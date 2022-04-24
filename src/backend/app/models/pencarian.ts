import { PencarianP } from "app/types/Pencarian";
import { db } from "../db";
import { RowDataPacket } from "mysql2";


export const findAll = async (callback: Function) => {
    const queryStr = "SELECT p.nama as nama_penyakit, h.tanggal as tanggal, h.nama_pengguna as nama_pengguna, h.hasil as hasil FROM penyakit as p, hasil_tes as h WHERE p.id = h.id_penyakit;";
    db.query(queryStr, (err, results) => {
        if (err) {callback(err)};
        const rows = <RowDataPacket[]>results;
        const pepenyakit: PencarianP[] = [];

        rows.forEach(row=>{
            const hasil: PencarianP = {
                namaPenyakit: row.nama_penyakit,
                tanggal: row.tanggal,
                namaPengguna: row.nama_pengguna,
                hasil: row.hasil
            }
            pepenyakit.push(hasil);
        })
        callback(null, pepenyakit);
    })

};