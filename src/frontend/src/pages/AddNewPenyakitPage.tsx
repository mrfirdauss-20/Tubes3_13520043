import React, {FC, useState} from "react";
import { Button, Form, Header, Input, Message } from "semantic-ui-react";
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

    }
    catch (e: any){
      if (e.message != "Network Error") {
        setInvalidSequenceDNA(true);
      }
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
            className="text-input"
            onChange={(val) => handleNamaPenyakitValueChange(val.currentTarget.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Sequence DNA</label>
          <Input
            className= "input-file"
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

    </>

  )
}

