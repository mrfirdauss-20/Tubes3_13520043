import React, {FC, useState} from "react";
import {Button, Form, Header} from "semantic-ui-react";
import {
  SearchQuery
} from "../state";

// import {useDispatch} from "react-redux";


export const HistoryPage: FC = () => {
  //const dispatch = useDispatch();
  const [newSearchQuery, setNewSearchQuery] = useState<SearchQuery>({date:"", penyakit:""})
  // const renderSearchHistory = (testResults: TestResult[]) => {
  //   let resultContent: JSX.Element[] = [];
  //   testResults.forEach((testResult: TestResult) => {
  //     resultContent.push(
  //       <div>
  //         <div>{testResult.date}</div>
  //         <div>{testResult.hasil}</div>
  //         <div>{testResult.penyakit}</div>
  //         <div>{testResult.namaPengguna}</div>
  //       </div>
  //     );
  //   });
  //   return resultContent;
  // }

  const convertQueryToRegex = (value: string) =>
  {
    const regDate = /\d{4}[-]\d{2}[-]\d{2}/g;
    const regPenyakit = /[^\d\W]+/i;
    const date = value.match(regDate);
    const penyakit = value.match(regPenyakit);

    const updatedNewSearchQuery = {...newSearchQuery};
    if(date) updatedNewSearchQuery.date = date.toString();
    if (penyakit) updatedNewSearchQuery.penyakit = penyakit.toString();
    setNewSearchQuery(updatedNewSearchQuery);
  }

  const handleSearchQueryChange = (value: string) => {
    convertQueryToRegex(value);
  }

  const handleSearchTestResult = () => {
    console.log("Searching")
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
    </>

  )
}

