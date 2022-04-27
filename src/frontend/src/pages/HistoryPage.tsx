import React, {FC, useState, useEffect} from "react";
import {Button, Form, Header} from "semantic-ui-react";
import {
  SearchQuery,
  TestResult
} from "../state";
import { searchTestHistory } from "../features/test/actions";

// import {useDispatch} from "react-redux";

const initialState = {
  newSearchQuery: {date:"", penyakit:""},
  testResults: []
}

export const HistoryPage: FC = () => {
  const [newSearchQuery, setNewSearchQuery] = useState<SearchQuery>(initialState.newSearchQuery)
  const [testResults, setTestResults] = useState<TestResult[]>(initialState.testResults)

  const convertDateUsingRegex = (value: string) => {
    const regDate = /\d{4}[-]\d{2}[-]\d{2}/g;
    const date = value.match(regDate);
    return date;
  }

  const renderSearchHistory = () => {
    let resultContent: JSX.Element[] = [];
    testResults.forEach((testResult: TestResult) => {
      resultContent.push(
        <div>
          <div>{convertDateUsingRegex(testResult.date)}</div>
          <div>{testResult.hasil == true ? "Positive" : "Negative"}</div>
          <div>{testResult.penyakit}</div>
          <div>{testResult.namaPengguna}</div>
        </div>
      );
    });

    return (
      <div>
        {resultContent}
      </div>
      )
  }

  const convertQueryToRegex = (value: string) =>
  {
    const regDate = /\d{4}[-]\d{2}[-]\d{2}/g;
    const regPenyakit = /[^\d\W]+/i;
    const date = value.match(regDate);
    const penyakit = value.match(regPenyakit);

    let updatedNewSearchQuery = {date:"", penyakit:""};
    if(date) updatedNewSearchQuery.date = date.toString();
    if (penyakit) updatedNewSearchQuery.penyakit = penyakit.toString();
    setNewSearchQuery(updatedNewSearchQuery);
  }

  const handleSearchQueryChange = (value: string) => {
    convertQueryToRegex(value);
  }

  const updateTestResults = (data: any[]) => {
    let testResultsResponse: TestResult[] = [];
    data.forEach((testResult: any) => {
      testResultsResponse.push({
        date: testResult.tanggal,
        namaPengguna: testResult.namaPengguna,
        penyakit: testResult.namaPenyakit,
        hasil: testResult.hasil,
      })
    });
    setTestResults(testResultsResponse);
  }

  const handleSearchTestResult = async () => {
    try {
      let response = await searchTestHistory(newSearchQuery);
      if (response.status == 404) {
        setTestResults(initialState.testResults);
      } else if (response.status == 200) {
        updateTestResults(response.data.data);
      }
    }
  catch (e: any){
      console.log(e.message);
    }
  }

  const handleResetButtonClicked = () => {
    setTestResults(initialState.testResults);
  }

  return (
    <>
      <Header as='h1' className="add-new-penyakit-title">
        DNA History
      </Header>
      <Form>
        <Form.Field>
          <label>Predicted Disease</label>
          <input
            onChange={(val) => handleSearchQueryChange(val.currentTarget.value)}
          />
        </Form.Field>
      </Form>
      <Button onClick={handleSearchTestResult}>
        Submit
      </Button>
      <Button onClick={handleResetButtonClicked}>
        Reset
      </Button>
      {
        testResults.length > 0 ?
          renderSearchHistory()
          :
          <div>Tidak ada data</div>
      }
    </>

  )
}

