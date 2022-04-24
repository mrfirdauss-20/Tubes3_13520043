import { PencarianP } from "../types/Pencarian";
import { db } from "../db/db";
import { RowDataPacket } from "mysql2";
import { Penyakit } from "app/types/Penyakit";


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


//ini kalo ada tanggal dan nama penyakit, kalo salah satu belum kepikiran
export const findByNamaPenyakitAndTanggal = async (namaPenyakit: string, tanggal: string, callback: Function) => {
    const queryStr = "SELECT h.tanggal as tanggal, h.nama_pengguna as nama_pengguna, p.nama as nama_penyakit, h.hasil as hasil FROM penyakit as p, hasil_tes as h WHERE p.id = h.id_penyakit AND p.nama = ? AND h.tanggal = ?;";
    db.query(queryStr, [namaPenyakit, tanggal], (err, results) => {
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
    });
}
