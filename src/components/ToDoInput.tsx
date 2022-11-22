import React, { Fragment, useState } from "react";
import Axios from "axios";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Row } from "react-bootstrap";
import { ToDoItem } from "./ToDo";
import uuid from 'react-uuid';

interface ToDoInputProps {
    onAddToDo: (item : ToDoItem) => void
}

export const ToDoInput : React.FC<ToDoInputProps> = (props) => {

    let item : ToDoItem = {
        id: "",
        name: "",
        completed: false
    };

    const addItem = (item : ToDoItem) => { Axios.post<ToDoItem[]>("http://localhost:3001/todos", item).then(res => { }) }
    
    const [todo, setTodo] = useState("");
    const [todoCheck, setTodoCheck] = useState(false);

    const addItemToList = (todoName : string) => {
        if (todoName.length > 0) {
            item.id = uuid();
            item.name = todoName;
            item.completed = todoCheck;
            addItem(item);
        }

        props.onAddToDo(item);
        setTodo("");
        setTodoCheck(false);
    }

    const changeToDoInputCheck = () => { setTodoCheck(!todoCheck) }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') { addItemToList(todo) } }

    const addTodo = (e : React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); addItemToList(todo) }

    return (
        <Fragment>
            <Row className="mb-5 justify-content-center align-items-center">
                <div className="input-cont position-relative">
                    <input type="text"
                        className="form-control"
                        placeholder="Inserisci un nuovo todo"
                        value={todo}
                        onKeyDown={(e) => handleKeyDown(e)}
                        onChange={(e) => setTodo(e.currentTarget.value)}
                    />
                    <label
                        htmlFor="item-check"
                        className={cn("badge-complete badge " + (todoCheck ? "text-bg-success" : "text-bg-unsuccess"))}>
                        {todoCheck ? "Completato" : "Da completare"}
                    </label>
                    <input type="checkbox" className="d-none" id="item-check" checked={todoCheck} onChange={() => changeToDoInputCheck()} />
                </div>
                <button onClick={addTodo} className="btn-add btn btn-primary btn-sm">
                    <FontAwesomeIcon icon={faPlus} className="mr-5px"/>Aggiungi
                </button>
            </Row>
        </Fragment>
    )
}