import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {AddItenForm} from "./Components/AddItenForm";
import {EditableSpan} from "./Components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {ButtonUniversal} from "./Components/ButtonUniversal";

export type TodolistType = {
    title: string
    tasks: TasksType[]
    removeTasks: (todolistId:string, id: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTasks: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, id: string, isDone: boolean) => void
    filter: FilterType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, id: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistType) => {
    const onClickAllHandler = () => props.changeFilter(props.todolistId, 'all')
    const onClickActiveHandler = () => props.changeFilter(props.todolistId, 'active')
    const onClickCompletedHandler = () => props.changeFilter(props.todolistId, 'completed')

    const callbackHandlerForInput = (newTitle: string) => {
        props.addTasks(props.todolistId, newTitle)
    }
    const onClickRemoveTodolist = () => props.removeTodolist(props.todolistId)

    const callBackHandlerForUpdateTask = (tId: string, title: string) => {
        props.updateTask(props.todolistId, tId, title)
    }
    const onPressRemoveTasksHandler = (id: string) => {
        props.removeTasks(props.todolistId, id)
    }
    const onChangeHandlerFromCheckbox = (e: ChangeEvent<HTMLInputElement>, tId: string) => {
        props.changeStatus(props.todolistId, tId, e.currentTarget.checked)
    }
    /*const tasksJSX = props.tasks.map(ts => {
        return (
            <div key={ts.id}
                 className={ts.isDone ? 'isDone' : ''}>
                <Checkbox checked={ts.isDone}
                          color="success"
                          onChange={(e) => onChangeHandlerFromCheckbox(e, ts.id)}/>{/!*галочка*!/}
                <EditableSpan title={ts.title}
                              callBack={(title) => callBackHandlerForUpdateTask(ts.id, title)}
                    //onChange={onChangeStatusHandler}
                />{/!*надпись*!/}
                <ButtonUniversal name={'X'} callBack={() => onPressRemoveTasksHandler(ts.id)}/>
                {/!*<IconButton size="small"
                            onClick={onPressRemoveTasksHandler}>
                    <Delete fontSize="inherit"/>
                </IconButton>*!/}
                {/!*кнопка для удаления тасок*!/}
            </div>
        )
    })*/
    const callBackHandlerForEditableSpanForHeader = (title: string) => {
        props.updateTodolist(props.todolistId, title)
    }
    return (
        <div>
            {/*Все что связано с описанием и редактированием Тудулиста*/}
            <h3>
                {/*//onChange={(onChange)=>{}}*/}
                <EditableSpan title={props.title}
                              callBack={(title) => callBackHandlerForEditableSpanForHeader(title)}/>
                <IconButton onClick={onClickRemoveTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <AddItenForm addItem={callbackHandlerForInput}/>
            </div>
            <div>
                {/*{tasksJSX}*/}
                {props.tasks.map(ts => {
                    return (
                        <div key={ts.id}
                             className={ts.isDone ? 'isDone' : ''}>
                            <Checkbox checked={ts.isDone}
                                      color="success"
                                      onChange={(e) => onChangeHandlerFromCheckbox(e, ts.id)}/>{/*галочка*/}
                            <EditableSpan title={ts.title}
                                          callBack={(title) => callBackHandlerForUpdateTask(ts.id, title)}
                                //onChange={onChangeStatusHandler}
                            />
                            {/*надпись*/}
                            <ButtonUniversal name={'X'} callBack={() => onPressRemoveTasksHandler(ts.id)}/>
                            {/*<IconButton size="small"
                            onClick={onPressRemoveTasksHandler}>
                            <Delete fontSize="inherit"/>
                            </IconButton>*/}
                            {/*кнопка для удаления тасок*/}
                        </div>
                    )
                })}
            </div>
            <div>
                <ButtonGroup>
                    <Button
                        variant={props.filter === "all" ? "contained" : "text"}
                        size="small"
                        onClick={onClickAllHandler}>All</Button>
                    <Button color="secondary"
                            variant={props.filter === 'active' ? 'contained' : 'text'}
                            size="small"
                            onClick={onClickActiveHandler}>Active</Button>
                    <Button color="success"
                            variant={props.filter === 'completed' ? 'contained' : 'text'}
                            size="small"
                            onClick={onClickCompletedHandler}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
};

