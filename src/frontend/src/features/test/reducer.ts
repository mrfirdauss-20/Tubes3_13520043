import {
  NewPenyakit,
  NewTestDNA,
  TestResult
} from "../../state"
import {ADD_NEW_TEST_DNA} from "./actions";

const initialState = {
  testResults : []
}

export default (state= initialState, action: any) => {
  switch (action.type) {
    case (ADD_NEW_TEST_DNA):
        return
  }

}