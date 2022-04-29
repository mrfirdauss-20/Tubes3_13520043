import React, {FC, useState, useEffect} from "react";
import { Form, Header, Card, Input, Button} from "semantic-ui-react";
import {
  SearchQuery,
  TestResult
} from "../state";
import { searchTestHistory } from "../features/actions";
import { convertDateUsingRegex } from "../utils/utilities";


const initialState = {
  newSearchQuery: {date:"", penyakit:""},
  testResults: []
}

export const HistoryPage: FC = () => {
  const [newSearchQuery, setNewSearchQuery] = useState<SearchQuery>(initialState.newSearchQuery)
  const [testResults, setTestResults] = useState<TestResult[]>(initialState.testResults)


  const renderSearchHistory = () => {
    let resultContent: JSX.Element[] = [];
    testResults.forEach((testResult: TestResult) => {
      resultContent.push(
        <Card className="history-page-card-component">
          <Card.Content>
            <Card.Header>{testResult.namaPengguna}</Card.Header>
            <Card.Meta>{testResult.date}</Card.Meta>
            <Card.Description>{testResult.penyakit}</Card.Description>
            <Card.Description>{testResult.hasil == true ? "Positive" : "Negative"}</Card.Description>
          </Card.Content>
        </Card>
      );
    });

    return (
      <Card.Group className="history-page-card-group">
        {resultContent}
      </Card.Group>
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
      const temp =  new Date(testResult.tanggal);
      const tempdate = temp.getFullYear().toString() + "-" + (temp.getMonth() + 1).toString() + "-" + temp.getDate().toString() ;
      console.log(tempdate);
      testResultsResponse.push({
        date: tempdate,
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
      <div className="history-page-content">
        <Header as='h1' className="title">
          DNA History
        </Header>
        <Form>
          <Form.Field className="history-page-form-field">
            <label>Predicted Disease</label>
            <input
              className="history-page-search-bar"
              onChange={(val) => handleSearchQueryChange(val.currentTarget.value)}
            />
          </Form.Field>
        </Form>
        <div className="history-page-buttons">
          <Button onClick={handleSearchTestResult} className="history-page-button">
            Submit
          </Button>
          <Button onClick={handleResetButtonClicked} className="history-page-button">
            Reset
          </Button>
        </div>

        {
          testResults.length > 0 ?
            renderSearchHistory()
            :
            <div>Tidak ada data</div>
        }
      </div>

    </>

  )
}

