import React, { FormEvent, Fragment, HtmlHTMLAttributes, useState } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Row } from "react-bootstrap";
import { ToDoItem } from "./ToDo";
import uuid from 'react-uuid';

const item : ToDoItem = {
    id: uuid(),
    name: "nuovo",
    completed: false
};

const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Axios.post<ToDoItem[]>("http://localhost:3001/todos", item).then(res => { console.log(res); });
    console.log(event.target);
    console.log("todo aggiunto");
}

export const ToDoInput : React.FC = (props) => {

    return (
        <Fragment>
                <Row className="mb-5">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <form onSubmit={handleSubmit}>
                            <input className="form-control d-inline-block w-75" type="text" placeholder="Inserisci un nuovo todo" name="name"/>
                            <button type="submit" value="Submit" className="btn btn-primary btn-sm ml-10px mb-1">
                                <FontAwesomeIcon icon={faPlus} className="mr-5px"/>Aggiungi
                            </button>
                        </form>
                    </div>
                </Row>
        </Fragment>
    )
}