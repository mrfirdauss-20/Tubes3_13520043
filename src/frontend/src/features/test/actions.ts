import {
  NewTestDNA,
  NewPenyakit
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
  (newPenyakit : NewPenyakit
  ) => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      const URL_PATH = "";
      const url =  "/" + URL_PATH;
      const urlEncodedParams = new URLSearchParams();

      urlEncodedParams.append("data", JSON.stringify({
        "nama": newPenyakit.namaPenyakit,
        "sequence": newPenyakit.sequenceDNA,
      }));

      dispatch(updateStoringPenyakit(true));

      axios({
        method: "post",
        url: url,
        withCredentials: true,
        data: urlEncodedParams,
        validateStatus: () => true
      })
        .then(response => {
          if (response.status === 200) {
            const ldiName = response.data.message.name;
            dispatch(updateStoringPenyakit(true));
          } else {
            console.log("Error");
          }
        });

    };

  };

export const submitTestDNA =
  (newTestDNA : NewTestDNA
  ) => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      const URL_PATH = "";
      const url = "/" + URL_PATH;
      const urlEncodedParams = new URLSearchParams();

      urlEncodedParams.append("data", JSON.stringify({
        "nama_pasien": newTestDNA.namaPengguna,
        "sequence": newTestDNA.sequenceDNA,
      }));

      dispatch(updateStoringPenyakit(true));

      axios({
        method: "post",
        url: url,
        withCredentials: true,
        data: urlEncodedParams,
        validateStatus: () => true
      })
        .then(response => {
          if (response.status === 200) {
            const ldiName = response.data.message.name;
            dispatch(updateStoringPenyakit(true));
          } else {
            console.log("Error");
          }
        });

    };

  };