# Tubes3_13520043
> Aplikasi web yang dapat menyimpan sekuens dna penyakit, serta mencocokkan sekuens dna pasien dengan sekuens dna penyakit.

## Table of Contents
* [Informasi Umum](#informasi-umum)
* [Teknologi yang digunakan](#teknologi-yang-digunakan)
* [Fitur](#fitur)
* [Tangkapan Layar](#tangkapan-layar)
* [Setup awal](#setup-awal)
* [Skema umum penggunaan](#skema-umum-penggunaan)
* [Peluang berkembang](#peluang-berkembang)
* [Rekognisi](#rekognisi)
* [Pemrogram](#pemrogram)
<!-- * [License](#license) -->


## Informasi umum
- App ini dikerjakan sebagai Tugas Besar 3 1F2211 Strategi Algoritma Teknik Informatika Institut Teknologi Bandung.
<!-- You don't have to answer all the questions - just the ones relevant to your project. -->


## Teknologi yang digunakan
- NodeJS
- ExpressJS
- ReactJS


## Fitur
- Memasukkan dan menyimpan sekuens dna penyakit
- Memeriksa apakah sekuens dna pasien mengandung sekuens dna suatu penyakit
- Menghitung kemiripan sekuens dna pasien mengandung sekuens dna suatu penyakit
- Melihat riwayat pemeriksaan dna berdasarkan tanggal dan/atau nama penyakit


## Tangkapan layar
![Laman Utama](./img/lamanutama.png)
<!-- If you have screenshots you'd like to share, include them here. -->


## Setup awal
Pastikan pada perangkat sudah terinstal NodeJS serta NPM
###Setup backend
Buka terminal, arahkan ke direktori root dari app, yakni direktori yang mengandung readme ini. Instalasi package yang dibutuhkan
```
cd src/backend/
npm install webpack webpack-cli
npm install
```
Jalankan backend
```
npm start
```
Buka terminal lain, arahkan ke direktori yang sama
```
cd src/backend/
npm install
```
Jalankan frontend
```
npm start
```
buka `localhost:3000` pada browser, dan nikmati fiturnya.



## Skema umum penggunaan
- Buka halaman add new disease, masukkan penyakit dengan sekuens dna yang sudah disiapkan dalam bentuk file .txt
- Buka halaman disease test, masukkan sekuens nama, sekuens dna pasien, serta nama penyakit yang ingin dilihat
- Lihat hasil
- Untuk mengetahui riwayat pemeriksaan, buka halaman history, lalu masukkan tanggal dan/atau nama penyakit


## Peluang berkembang
- Kueri history yang bisa dibuat lebih banyak menjangkau jenis kueri, seperti bulan yang dihurufkan
- Mendeploy aplikasi


## Rekognisi
Terima Kasih kepada seluruh dosen IF2211 serta Asisten 


## Pemrogram
- 13520043 Muhammad Risqi Firdaus
- 13520045 Addin Nabilal Huda
- 13520100 Averrous Saloom


<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
