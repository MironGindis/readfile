import React, { useState, useEffect} from 'react';
import M from "materialize-css";
import { CardPanel, Row, Col,TextInput, Button} from 'react-materialize';
import { render } from '@testing-library/react';

let  App =() => {

  let [file1, setFile1] = useState(undefined);
  let [file2, setFile2] = useState(undefined);
  let [result1, setResult1] = useState(undefined);
  let [result2, setResult2] = useState(undefined);

  useEffect(() => { 
     if (result1) console.log(`file1 : ${result1}`);
    }, [result1]);
  useEffect(() => { 
    if (result2) console.log(`file2 : ${result2}`);
    }, [result2]);

  let getFile = (e) => {
    const {files, name} = e.target;
    const file = files[0];
    if (name === 'File1') {
      setFile1(file);
    }
    if (name === 'File2') {
      setFile2(file);
    }    
  }
  let fileReader = (file) => {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      if (file.name === file1.name) {
        setResult1(reader.result);
      }
      if (file.name === file2.name) {
        setResult2(reader.result);
      }
    };
    render.onerror = () => {
      console.log(reader.error);
    }  
  }
  let showfiles = () => {
    if (file1 && file2) {
      fileReader(file1);
      fileReader(file2);
    } else {
      return M.toast({html: 'Загрузите оба файла'});
    }
  }

  return (
    <Row >
      <CardPanel className="valign-wrapper">
        <Row >
          <Col>
            <Row>
            <TextInput  onChange={getFile} id="TextInput-1" label="File 1" type="file" name="File1"/>
            <TextInput onChange={getFile} id="TextInput-2" label="File 2" type="file" name="File2"/>
            </Row>
            <Button onClick={showfiles}>
              Отправить 
            </Button>
          </Col>
        </Row>
      </CardPanel>
    </Row>
  );
}

export default App;
