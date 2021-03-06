import { PencarianP } from "../types/Pencarian";
import { db } from "../db/db";
import { RowDataPacket } from "mysql2";
import { Penyakit } from "app/types/Penyakit";
import { levensthein } from "app/lib/string_matcher";


//ini kalo ada tanggal dan nama penyakit, kalo salah satu belum kepikiran
export const findByNamaPenyakitAndTanggal = async (namaPenyakit: string, tanggal: string, callback: Function) => {
    let queryStr = "SELECT h.tanggal as tanggal, h.nama_pengguna as nama_pengguna, p.nama as nama_penyakit, h.hasil as hasil, h.kemiripan as kemiripan FROM penyakit as p, hasil_tes as h WHERE p.id = h.id_penyakit AND ";
    if(tanggal != "" && namaPenyakit != ""){
        queryStr += "p.nama = '"+namaPenyakit+"' AND h.tanggal like '"+tanggal+"%';";
    }else if(tanggal!=""){
        queryStr += "h.tanggal like '"+tanggal+"%';";
    }else{
        queryStr+= "p.nama = '"+namaPenyakit+"';";
    }
    console.log(queryStr);
    db.query(queryStr, [], (err, results) => {
        if (err) {callback(err)};
        const rows = <RowDataPacket[]>results;
        const pepenyakit: PencarianP[] = [];
        console.log(rows);
        rows.forEach(row=>{
            const hasil: PencarianP = {
                namaPenyakit: row.nama_penyakit,
                tanggal: row.tanggal,
                namaPengguna: row.nama_pengguna,
                hasil: row.hasil,
                kemiripan: row.kemiripan
            }
            pepenyakit.push(hasil);
        })
        callback(null, pepenyakit);
    });
}
