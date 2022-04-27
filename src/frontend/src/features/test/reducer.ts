// import {
//
// } from "../../state"
import {ADD_NEW_PENYAKIT} from "./actions";

const initialState = {
  testResults : [{  date: "",
    namaPengguna: "",
    penyakit: "",
    hasil: ""}],
  newPenyakit: {
    namaPenyakit: "",
    sequenceDNA: ""
  }
}

export default (state=initialState, action: any) => {
  switch (action.type) {
    case (ADD_NEW_PENYAKIT):
        return Object.assign({}, state, {
          newPenyakit: action.payload
        });
  }

}