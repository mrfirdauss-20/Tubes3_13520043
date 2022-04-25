
CREATE DATABASE IF NOT EXISTS tubes3;

use tubes3;

CREATE TABLE IF NOT EXISTS penyakit(
id INT AUTO_INCREMENT PRIMARY KEY,
nama VARCHAR(255) NOT NULL,
sequence text NOT NULL
);

CREATE TABLE IF NOT EXISTS nilai_border (
id_penyakit INT,
nilai_border JSON,
FOREIGN KEY (id_penyakit) REFERENCES penyakit(id)
);

CREATE TABLE IF NOT EXISTS peta_last_occurence (
id_penyakit INT,
peta_last_occurence JSON,
FOREIGN KEY (id_penyakit) REFERENCES penyakit(id)
);

CREATE TABLE IF NOT EXISTS hasil_tes(
id INT PRIMARY KEY AUTO_INCREMENT,
id_penyakit INT,
tanggal DATE NOT NULL,
nama_pengguna VARCHAR(30) NOT NULL,
hasil TINYINT(1) NOT NULL,
kemiripan INT,
FOREIGN KEY (id_penyakit) REFERENCES penyakit(id)
);