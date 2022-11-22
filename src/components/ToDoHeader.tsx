import React, { Fragment } from "react";
import { ToDoInput } from "./ToDoInput";
import { Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { ToDoItem } from "./ToDo";

interface ToDoHeaderProps {
    onAddToDo: (item : ToDoItem) => void
}

export const ToDoHeader : React.FC<ToDoHeaderProps> = (props) => {

    return (
        <Fragment>
            <Row className="mt-4 mb-5">
                <div className="col text-center">
                    <h1>ToDo List</h1>
                </div>
            </Row>
            <ToDoInput onAddToDo={(item) => props.onAddToDo(item)} />
            <Row>
                <div className="col-2"></div>
                <div className="col text-center mb-3">
                    <h2>
                        <FontAwesomeIcon className="mr-10px text-danger" icon={faTimesCircle} />
                        Da fare
                    </h2>
                </div>
                <div className="col-1"></div>
                <div className="col text-center mb-3">
                    <h2>
                        <FontAwesomeIcon className="mr-10px text-success" icon={faCheckCircle} />
                        Completate
                    </h2>
                </div>
                <div className="col-2"></div>
            </Row>
        </Fragment>
    )
}