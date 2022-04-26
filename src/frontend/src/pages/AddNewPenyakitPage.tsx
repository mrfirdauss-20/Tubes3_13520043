import React, {FC, useState} from "react";
import {Button, Form, Header} from "semantic-ui-react";
// import {useDispatch} from "react-redux";
import {
  NewPenyakit
} from "../state";

export interface AddNewPenyakitProps {
  handleAddNewPenyakit: () => void;
  newPenyakit: NewPenyakit
}

export const AddNewPenyakitPage: FC<AddNewPenyakitProps>  = () => {
  //const dispatch = useDispatch();
  const [newPenyakit, setNewPenyakit] = useState<NewPenyakit>({namaPenyakit:"", sequenceDNA:""})

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


  const handleAddNewPenyakit = () => {
    console.log("New Penyakit Added")
  }

  return (
    <>
      <Header as='h1' className="add-new-penyakit-title">
        Add New Disease
      </Header>
      <Form>
        <Form.Field>
          <label>Disease</label>
          <input
            onChange={(val) => handleNamaPenyakitValueChange(val.currentTarget.value)}
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
      </Form>
      <Button onClick={handleAddNewPenyakit}>
        Submit
      </Button>
    </>

  )
}

