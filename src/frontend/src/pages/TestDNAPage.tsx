import React, {FC, useState} from "react";
import {Button, Form, Header} from "semantic-ui-react";
import {
  NewTestDNA
} from "../state";
import { storeNewPenyakit, submitTesDNA } from "../features/test/actions";

// import {useDispatch} from "react-redux";


interface TestDNAProps {
  handleTestDNA: () => void;
  newTestDNA: NewTestDNA
}

export const TestDNAPage: FC<TestDNAProps>  = () => {
  //const dispatch = useDispatch();
  const [newTestDNA, setNewTestDNA] = useState<NewTestDNA>({namaPengguna:"", sequenceDNA:"", prediksiPenyakit:""})

  let fileReader: FileReader;

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

  const handleAddNewTestDNA = async () => {
    try {
      let response = await submitTesDNA(newTestDNA);
      console.log(response);
    }
    catch (e: any){
      console.log(e.message);
      console.log("Error")
    }
  }

  return (
    <>
      <Header as='h1' className="add-new-penyakit-title">
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
            (event) =>
              event.currentTarget.files ?
              handleFileChosen(event.currentTarget.files[0])
              :
              console.log("a")}
          />
        </Form.Field>
        <Form.Field>
          <label>Predicted Disease</label>
          <input
            onChange={(val) => handlePrediksiPenyakitValueChange(val.currentTarget.value)}
          />
        </Form.Field>
      </Form>
      <Button onClick={handleAddNewTestDNA}>
        Submit
      </Button>
    </>

  )
}

