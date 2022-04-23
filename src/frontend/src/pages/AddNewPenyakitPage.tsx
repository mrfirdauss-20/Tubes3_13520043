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

export const AddNewPenyakit: FC<AddNewPenyakitProps>  = () => {
  //const dispatch = useDispatch();
  const [newPenyakit, setNewPenyakit] = useState<NewPenyakit>({namaPenyakit:"", sequenceDNA:""})

  const handleNamaPenyakitValueChange = (value: string) => {
    const updatedNewPenyakit = {...newPenyakit};
    updatedNewPenyakit.namaPenyakit = value;
    setNewPenyakit(updatedNewPenyakit);
  }

  const handleSequenceDNAValueChange = (value: string) => {
    const updatedNewPenyakit = {...newPenyakit};
    updatedNewPenyakit.sequenceDNA = value;
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
            onChange={(val) => handleSequenceDNAValueChange(val.currentTarget.value)}
          />
        </Form.Field>
      </Form>
      <Button onClick={handleAddNewPenyakit}>
        Submit
      </Button>
    </>

  )
}

