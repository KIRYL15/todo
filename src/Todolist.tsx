import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {Input} from "./Components/Input";
import {EditItem} from "./Components/EditIItem";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodolistType = {
    title: string
    tasks: TasksType[]
    removeTasks: (todolistId: string, TaskId: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTasks: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, id: string, value: boolean) => void
    filter: FilterType
    todolistId: string
    removeTodolist: (todolistId: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistType) => {
    const onClickAllHandler = () => {
        props.changeFilter(props.todolistId, 'all')
    }
    const onClickActiveHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const onClickCompletedHandler = () => {
        props.changeFilter(props.todolistId, 'completed')
    }
    const addTodolistTasks = (title: string) => {
        props.addTasks(props.todolistId, title)
    }
    const onClickRemoveTodolist = () => {
        props.removeTodolist(props.todolistId)
    }
    const tasksJSX = props.tasks.map(ts => {
            const onPressRemoveTasksHandler = () => props.removeTasks(props.todolistId, ts.id)
            const onChangeTasksHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.todolistId, ts.id, e.currentTarget.checked)
            return (
             <div  key={ts.id}
                       className={ts.isDone ? 'isDone' : ''}>
                <Checkbox checked={ts.isDone}
                          color="success"
                          onChange={onChangeTasksHandler}/>{/*галочка*/}
                <EditItem title={ts.title}/>{/*надпись*/}
                <IconButton size="small"
                            onClick={onPressRemoveTasksHandler}>
                    <Delete fontSize="inherit"/>
                </IconButton>
                {/*кнопка для удаления тасок*/}
             </div>
        )})

    return (
        <div>
            <h3>
                <EditItem title={props.title}/>
                {/*<button onClick={onClickRemoveTodolist}>X</button>*/}
                <IconButton onClick={onClickRemoveTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <Input jopa={addTodolistTasks}/>
            </div>
            <div>
                <div>{tasksJSX}</div>
            </div>
                      <div>
                <ButtonGroup>
                    <Button
                        variant={props.filter === "all"? "contained" : "text"}
                        size="small"
                        onClick={onClickAllHandler}>All
                    </Button>
                    <Button color="secondary"
                            variant={props.filter === 'active' ? 'contained' : 'text'}
                            size="small"
                            onClick={onClickActiveHandler}>Active
                    </Button>
                    <Button color="success"
                            variant={props.filter === 'completed' ? 'contained' : 'text'}
                            size="small"
                            onClick={onClickCompletedHandler}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
};

