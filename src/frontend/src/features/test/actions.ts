import {
  NewTestDNA,
  NewPenyakit, SearchQuery
} from "../../state";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import axios from "axios";

export const ADD_NEW_PENYAKIT = "ADD_NEW_PENYAKIT";
export const ADD_NEW_TEST_DNA = "ADD_NEW_TEST_DNA";

export const UPDATE_STORING_PENYAKIT_ATTRIBUTE = "UPDATE_STORING_PENYAKIT_ATTRIBUTE";

// export const addNewPenyakit = (newPenyakit: NewPenyakit) => {
//   return { type: ADD_NEW_PENYAKIT, payload: newPenyakit };
// };

export const addNewDNATest = (newTestDNA: NewTestDNA) => {
  return { type: ADD_NEW_TEST_DNA, payload: newTestDNA };
};

export const updateStoringPenyakit = (isStoring: boolean) => {
  return {
    type: UPDATE_STORING_PENYAKIT_ATTRIBUTE, payload: {
      isStoring: isStoring,
      lastUpdated: new Date().getTime()
    }
  };
};

export const storeNewPenyakit =
  async (newPenyakit : NewPenyakit
  ) => {
    const URL_PATH = "penyakit";
    const url = "http://localhost:5000/" + URL_PATH;
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
    const url = "http://localhost:5000/" + URL_PATH;
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
    const url = "http://localhost:5000/" + URL_PATH;
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