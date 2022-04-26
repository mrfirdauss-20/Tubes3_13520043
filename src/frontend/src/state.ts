export interface NewPenyakit {
  namaPenyakit: string;
  sequenceDNA: string | ArrayBuffer | null
}

export interface NewTestDNA {
  namaPengguna: string;
  sequenceDNA: string | ArrayBuffer | null;
  prediksiPenyakit: string
}


export interface TestResult {
  date: string;
  namaPengguna: string;
  penyakit: string;
  hasil: boolean;
}

export interface SearchQuery {
  date: string;
  penyakit: string;
}
