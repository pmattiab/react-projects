import React, { Fragment } from "react";
import Axios  from 'axios';
import cn from "classnames";
// import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export interface ToDoItem {
    id: string,
    name: string,
    completed: boolean
}

interface TodoProps {
    items: ToDoItem[],
    changeList: (item : ToDoItem) => void
}

export const ToDo : React.FC<TodoProps> = (props) => {

    const deleteItem = (item : ToDoItem) => { Axios.delete<ToDoItem>(`http://localhost:3001/todos/${item.id}`).then(res => { props.changeList(item) }); }

    const toggleStatus = (item : ToDoItem) => {
        item.completed = !item.completed;
        Axios.put<ToDoItem>(`http://localhost:3001/todos/${item.id}`, item).then(res => { props.changeList(res.data) });
    }

    return (

        <Fragment>
            <ul>
                {
                    props.items.map(item => {
                        return (
                            <li key={item.id} className="li-item p-2 d-flex justify-content-center align-items-center mb-2">
                                <div className={"mr-10px pointer badge " + cn("text-bg-" + (item.completed ? "success" : "danger"))}
                                    onClick={() => toggleStatus(item)}>
                                    {item.completed ? "Completato" : "Da fare"}
                                </div>
                                <div className="li-item-name">{item.name}</div>
                                <div className="btn btn-danger btn-sm btn-trash ml-10px"
                                    onClick={() => deleteItem(item)}>
                                    <FontAwesomeIcon icon={faTrashCan}/>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </Fragment>
    )
}