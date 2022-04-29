import React, { FC, useCallback, useState } from "react";
import { Button, Card, Form, Header, Label, Message } from "semantic-ui-react";
import {
  NewTestDNA, TestResult
} from "../state";
import { submitTesDNA } from "../features/actions";
import { convertDateUsingRegex, isValidSequenceDNA } from "../utils/utilities";

// import {useDispatch} from "react-redux";


interface TestDNAProps {
  handleTestDNA: () => void;
  newTestDNA: NewTestDNA
}

const initialState = {
  newTestDNA: { namaPengguna: "", sequenceDNA: "", prediksiPenyakit: "" },
  testResult: { date: "", namaPengguna: "", penyakit: "", hasil: true }
}

export const TestDNAPage: FC<TestDNAProps>  = () => {
  //const dispatch = useDispatch();
  const [newTestDNA, setNewTestDNA] = useState<NewTestDNA>(initialState.newTestDNA);
  const [testResult, setTestResult] = useState<TestResult>(initialState.testResult);
  
  const [invalidSequenceDNA, setInvalidSequenceDNA] = useState(false);

  let fileReader: FileReader;

  // const renderTestResult = () => {
  //     return(
  //       <Card className="history-page-card-component">
  //         <Card.Content>
  //           <Card.Header>{testResult.namaPengguna}</Card.Header>
  //           <Card.Meta>{convertDateUsingRegex(testResult.date)}</Card.Meta>
  //           <Card.Description>{testResult.penyakit}</Card.Description>
  //           <Card.Description>{testResult.hasil == true ? "Positive" : "Negative"}</Card.Description>
  //         </Card.Content>
  //       </Card>
  //       )
  // };

  const handleFileRead = () => {
    const content = fileReader.result;
    const updatedNewTestDNA = {...newTestDNA};
    updatedNewTestDNA.sequenceDNA = content;
    setNewTestDNA(updatedNewTestDNA);
  };

  const handleFileChosen = (file: File) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const handleNamaPenggunaValueChange = (value: string) => {
    const updatedNewTestDNA = {...newTestDNA};
    updatedNewTestDNA.namaPengguna = value;
    setNewTestDNA(updatedNewTestDNA);
  }

  const handlePrediksiPenyakitValueChange = (value: string) => {
    const updatedNewTestDNA = {...newTestDNA};
    updatedNewTestDNA.prediksiPenyakit = value;
    setNewTestDNA(updatedNewTestDNA);
  }

  const updateTestResult = (data: any) => {
    let testResultsResponse = {...initialState.testResult};
    testResultsResponse.date =  data.tanggal;
    testResultsResponse.namaPengguna = data.namaPengguna;
    testResultsResponse.penyakit = data. namaPenyakit;
    testResultsResponse.hasil = data.hasil;
    setTestResult(testResultsResponse);
  }

  const handleAddNewTestDNA = async () => {
    setInvalidSequenceDNA(false);
    try {
      isValidSequenceDNA(newTestDNA.sequenceDNA);
      let response = await submitTesDNA(newTestDNA);
      if (response.status == 404){
        return (<Message warning><Message.Header>Data penyakit tidak ada</Message.Header></Message>)
      } else{
        updateTestResult(response.data.data[0]);

      }
    }
    catch (e: any){
      console.log(e.message);
      console.log("Error");
      setInvalidSequenceDNA(true);
    }
  }

  return (
    <>
      <Header as='h1' className="title">
        Test Your DNA!
      </Header>
      <Form>
        <Form.Field>
          <label>User Name</label>
          <input
            onChange={(val) => handleNamaPenggunaValueChange(val.currentTarget.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Sequence DNA</label>
          <input
            type = 'file'
            onChange={
            (event) =>{
            if(event.currentTarget.files) handleFileChosen(event.currentTarget.files[0])}}
          />
          <Message warning visible={invalidSequenceDNA}>
            <Message.Header>Invalid DNA Sequence!</Message.Header>
          </Message>
        </Form.Field>
        <Form.Field>
          <label>Predicted Disease</label>
          <input
            onChange={(val) => handlePrediksiPenyakitValueChange(val.currentTarget.value)}
          />
        </Form.Field>
      </Form>
      <Button onClick={handleAddNewTestDNA} className="submit-button">
        Submit
      </Button>
      {        console.log("130", testResult)}
      {
        testResult.date != "" ?
        <Card className="history-page-card-component">
          <Card.Content>
          <Card.Header>{testResult.namaPengguna}</Card.Header>
          <Card.Meta>{convertDateUsingRegex(testResult.date)}</Card.Meta>
          <Card.Description>{testResult.penyakit}</Card.Description>
          <Card.Description>{testResult.hasil == true ? "Positive" : "Negative"}</Card.Description>
          </Card.Content>
        </Card>
      :
          console.log("142")
      }

    </>

  )
}

