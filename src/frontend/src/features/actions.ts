import {
  NewTestDNA,
  NewPenyakit, SearchQuery
} from "../state";
import axios from "axios";

const REACT_URL = "http://localhost:5000/";
// const REACT_URL = "http://tubes3-13520043.herokuapp.com/" ;

export const storeNewPenyakit =
  async (newPenyakit : NewPenyakit
  ) => {
    const URL_PATH = "penyakit";
    const url = REACT_URL+ URL_PATH;
    return (
      axios({
        method: "post",
        url: url,
        headers: {'Content-Type': 'application/json' },
        data: JSON.stringify({
          "nama_penyakit": newPenyakit.namaPenyakit,
          "sequence": newPenyakit.sequenceDNA,
        }),
        validateStatus: () => true
      })
    )
  }

export const submitTesDNA =
  async (newTestDNA : NewTestDNA
  ) => {
    const URL_PATH = "similarity";
    const url = REACT_URL+ URL_PATH;
    return (
      axios({
        method: "post",
        url: url,
        headers: {'Content-Type': 'application/json' },
        data: JSON.stringify({
          "namaPengguna": newTestDNA.namaPengguna,
          "namaPenyakit": newTestDNA.prediksiPenyakit,
          "sequence": newTestDNA.sequenceDNA,
        }),
        validateStatus: () => true
      })
    )
  }

export const searchTestHistory =
  async (searchQuery: SearchQuery
  ) => {
    const URL_PATH = "search";
    const url = REACT_URL + URL_PATH;
    return (
      axios({
        method: "post",
        url: url,
        headers: {'Content-Type': 'application/json' },
        data: JSON.stringify({
          "nama_penyakit": searchQuery.penyakit,
          "tanggal": searchQuery.date
        }),
        validateStatus: () => true
      })
    )
  }