import { Penyakit } from "../types/Penyakit";
import { PencarianP } from "app/types/Pencarian";

import { db } from "../db/db";
import { RowDataPacket } from "mysql2";

import { BoyerMoore, KnuthMorrisPratt, levensthein } from "../lib/string_matcher";

export const insertNilaiBorder = async (idPenyakit: number, sequence: string, callback: Function) => {
  const queryStr = "INSERT INTO nilai_border (id_penyakit, nilai_border) VALUE (?,?);";
  //console.log("Masuk nilai border");
  const nilai_border = KnuthMorrisPratt.border(sequence);
  db.query(
    queryStr,
    [idPenyakit, JSON.stringify(nilai_border)],
    (err, results) => {
      if (err) {
        callback(err)
      }
      //console.log("Masuk nilai quer");
      KnuthMorrisPratt.borderData.set(idPenyakit, nilai_border)

    }
  )
}

export const insertNilaiLastOccurence = async (idPenyakit: number, sequence: string, callback: Function) => {
  const queryStr = "INSERT INTO peta_last_occurence (id_penyakit, peta_last_occurence) VALUE (?,?);";
  //console.log("Masuk nilai last occurence");
  const lastOccurence = BoyerMoore.lastOccurence(sequence);
  console.log(lastOccurence);
  db.query(
    queryStr,
    [idPenyakit, JSON.stringify(lastOccurence)],
    (err, results) => {
      if (err) {
        callback(err)
      }
      //console.log("Qury lAST occurence");
      BoyerMoore.lastOccurenceData.set(idPenyakit, lastOccurence)
    }
  )
}

export const insertPenyakit= async (namaPenyakit: string, sequence:string, callback: Function) => {
  //console.log(namaPenyakit,sequence)
  const queryStr = "INSERT INTO penyakit (nama,sequence) VALUE (?,?) ;";
  db.query(
    queryStr,
    [namaPenyakit,sequence],
    async (err, result) => {
      if (err) {
        callback(err);
      }
      await insertNilaiBorder(result["insertId"], sequence, callback);
      await insertNilaiLastOccurence(result["insertId"], sequence, callback);
      //console.log("Masuk penyakit");
      callback(null, result);
    }

  )
}

export const findSimilar = async (namaPengguna: string, namaPenyakit: string, sequence: string, callback: Function) => {
  const queryStr = "SELECT p.id, p.nama as nama_penyakit, p.sequence  as sequence FROM penyakit as p WHERE p.nama = ?;";
  db.query(queryStr, [namaPenyakit], (err, results) => {
    if (err) {callback(err)};
    const rows = <RowDataPacket>results;
    const pepenyakit: Penyakit[] = [];

    if(rows.length === 0){
      callback(null, []);
    }else{
      rows.forEach(row=>{
        const hasil: Penyakit = {
          id: row.id,
          nama: row.nama_penyakit,
          sequence: row.sequence
                }
        pepenyakit.push(hasil);
      });
      // drop string comparing function here

      const hasil = KnuthMorrisPratt.find(
        {
          pattern: pepenyakit[0].sequence,
          borderValue: KnuthMorrisPratt.borderData.get(pepenyakit[0].id)
        },
        sequence
      )
      const tanggal = new Date();
      var kemiripan:number;
      if(pepenyakit[0].sequence.length>sequence.length){
        kemiripan = 1-levensthein(pepenyakit[0].sequence, sequence)/pepenyakit[0].sequence.length;
      }else{
        kemiripan = 1- levensthein(pepenyakit[0].sequence, sequence)/sequence.length;
      }
      // insert data
      const queryStr = "INSERT INTO hasil_tes (id_penyakit,tanggal,nama_pengguna,hasil,kemiripan) VALUES (?,?,?,?,?);";
      const isValid = hasil == -1 ? (kemiripan<0.8 ? 0 : 1 ) : 1
      const hasil_tes : PencarianP []= [];
      db.query(
        queryStr,
        [pepenyakit[0].id,tanggal,namaPengguna, isValid, kemiripan],
        (err, results) => {
          if(err){
            callback(err);
          }

          var search: PencarianP = {
            namaPenyakit: namaPenyakit,
            tanggal: tanggal,
            namaPengguna: namaPengguna,
            hasil: isValid,
            kemiripan: kemiripan
          }
          console.log(search)
          callback(null,[search])

        }
      )
     // callback(null, search);
    }


    //switch pepenyakit dengan jawaban
  })

}
