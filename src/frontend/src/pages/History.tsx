import React, {FC, useState} from "react";
import {Button, Form, Header} from "semantic-ui-react";
import {
  SearchQuery
} from "../state";

// import {useDispatch} from "react-redux";


export const TestResultPage: FC = () => {
  //const dispatch = useDispatch();
  const [newSearchQuery, setNewSearchQuery] = useState<SearchQuery>({date:"", penyakit:""})

  const convertQueryToRegex = (value: string) =>
  {
    // var regDate = /^\d{2}$/;
    // var regMonth = /^[A-z]{1}[a-z]+$/
    // var regYear = /^\d{4}$/;
    const regDate = /\d{4}[-]\d{2}[-]\d{2}/g;
    const regPenyakit = /^\w+/i;
    const date = value.match(regDate);
    const penyakit = value.match(regPenyakit);

    const updatedNewSearchQuery = {...newSearchQuery};
    if(date) updatedNewSearchQuery.date = date.toString();
    if (penyakit) updatedNewSearchQuery.penyakit = penyakit.toString();
    setNewSearchQuery(updatedNewSearchQuery);
    console.log(updatedNewSearchQuery);
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

