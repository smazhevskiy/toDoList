import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsTodoListType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTodoListFilter: (filterValue: FilterValuesType, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

function TodoList(props: PropsTodoListType) {
    const filter = props.filter


    const tasksJSXElements = props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.todoListID)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.target.checked, props.todoListID)
            }
            const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)
            return (
                <li key={t.id} >
                    <span className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            size={"small"}
                            color={"primary"}
                            checked={t.isDone}
                            onChange={changeTaskStatus}
                        />
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    </span>
                    <IconButton onClick={removeTask} color={"secondary"} >
                        <Delete/>
                    </IconButton>
                </li>
            )
        }
    )

    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)
    const removeTodolist = () => props.removeTodoList(props.todoListID)
    const onClickSetAllFilter = () => props.changeTodoListFilter("all", props.todoListID)
    const onClickSetActiveFilter = () => props.changeTodoListFilter("active", props.todoListID)
    const onClickSetCompletedFilter = () => props.changeTodoListFilter("completed", props.todoListID)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodolist} color={"secondary"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", padding: "0px"}}>
                {tasksJSXElements}
            </ul>
            <div>
                <Button
                    size={"small"}
                    variant={filter === "all" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={onClickSetAllFilter}>All</Button>
                <Button
                    style={{marginLeft: "3px", }}
                    size={"small"}
                    variant={filter === "active" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={onClickSetActiveFilter}>Active</Button>
                <Button
                    style={{marginLeft: "3px"}}
                    size={"small"}
                    variant={filter === "completed" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={onClickSetCompletedFilter}>Completed</Button>
            </div>
        </div>
    )
}

export default TodoList;