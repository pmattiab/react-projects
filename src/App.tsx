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

  useEffect(() => {

    Axios.get<ToDoItem[]>("http://localhost:3001/todos").then(res => { setItems(res.data); console.log("carico lista dei todo"); });

  }, []);

  return (
    <Container>

      <ToDoHeader />

      <Row>
        <div className="col-2"></div>
        <div className="col">
            <ToDo items={items.filter(item => !item.completed)} />
          </div>

          <div className="col-1"></div>

          <div className="col">
            <ToDo items={items.filter(item => item.completed)} />
          </div>
          <div className="col-2"></div>
      </Row>

    </Container>
  );
}

export default App;