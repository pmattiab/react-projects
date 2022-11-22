import React, { useEffect, useState } from 'react';
import Axios  from 'axios';
import { ToDoHeader } from './components/ToDoHeader';
import { ToDo, ToDoItem } from './components/ToDo';
import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';

function App() {

  const [items, setItems] = useState<ToDoItem[]>([]);

  useEffect(() => { getList() }, []);

  const getList = () => { Axios.get<ToDoItem[]>("http://localhost:3001/todos").then(res => { setItems(res.data); console.log("render list") }); };

  const onChangeList = (item : ToDoItem) => { if (item) { getList() } };

  return (

    <Container>

      <ToDoHeader onAddToDo={getList} />

      <Row>
        <div className="col-2"></div>
        <div className="col">
            <ToDo items={items.filter(item => !item.completed)} changeList={(item) => onChangeList(item)} />
          </div>

          <div className="col-1"></div>

          <div className="col">
            <ToDo items={items.filter(item => item.completed)} changeList={(item) => onChangeList(item)} />
          </div>
          <div className="col-2"></div>
      </Row>

    </Container>
  );
}

export default App;