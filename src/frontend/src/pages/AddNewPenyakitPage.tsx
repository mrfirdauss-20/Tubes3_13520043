import React, {FC, useState} from "react";
import { Button, Form, Header, Input, Label, Message } from "semantic-ui-react";
// import {useDispatch} from "react-redux";
import {
  NewPenyakit
} from "../state";
import { storeNewPenyakit } from "../features/actions";
import { isValidSequenceDNA } from "../utils/utilities";

export interface AddNewPenyakitProps {
  handleAddNewPenyakit: () => void;
  newPenyakit: NewPenyakit
}

const initialState = {
  newPenyakit: {namaPenyakit:"", sequenceDNA:""}
}
export const AddNewPenyakitPage: FC<AddNewPenyakitProps>  = () => {
  const [newPenyakit, setNewPenyakit] = useState<NewPenyakit>(initialState.newPenyakit)
  const [invalidSequenceDNA, setInvalidSequenceDNA] = useState(false);
  const [addNewPenyakitSucceeded, setAddNewPenyakitSucceeded] = useState(false);
  let fileReader: FileReader;



  const handleFileRead = () => {
    const content = fileReader.result;
    const updatedNewPenyakit = {...newPenyakit};
    updatedNewPenyakit.sequenceDNA = content;
    setNewPenyakit(updatedNewPenyakit);
  };

  const handleFileChosen = (file: File) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const handleNamaPenyakitValueChange = (value: string) => {
    setAddNewPenyakitSucceeded(false);
    const updatedNewPenyakit = {...newPenyakit};
    updatedNewPenyakit.namaPenyakit = value;
    setNewPenyakit(updatedNewPenyakit);
  }

  const handleAddNewPenyakit = async () => {
    setInvalidSequenceDNA(false);
    try {
      isValidSequenceDNA(newPenyakit.sequenceDNA);
      await storeNewPenyakit(newPenyakit);
      setNewPenyakit(initialState.newPenyakit);
      setAddNewPenyakitSucceeded(true);
    }
    catch (e: any){
      if (e.message != "Network Error")
      console.log(e.message);
      setInvalidSequenceDNA(true);
    }
  }

  return (
    <>
      <Header as='h1' className="title">
        Add New Disease
      </Header>
      <Form>
        <Form.Field>
          <label>Disease</label>
          <Input
            onChange={(val) => handleNamaPenyakitValueChange(val.currentTarget.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Sequence DNA</label>
          <Input
            type = 'file'
            onChange={
              (event) =>
                event.currentTarget.files ?
                  handleFileChosen(event.currentTarget.files[0])
                  :
                  console.log("a")}
          />
        <Message warning visible={invalidSequenceDNA}>
          <Message.Header>Invalid DNA Sequence!</Message.Header>
        </Message>
        </Form.Field>
      </Form>
      <Button onClick={handleAddNewPenyakit} className="submit-button">
        Submit
      </Button>
      {/*<Message visible={addNewPenyakitSucceeded}>*/}
      {/*  <Message.Header>A new disease has been successfully added!</Message.Header>*/}
      {/*</Message>*/}
    </>

  )
}

