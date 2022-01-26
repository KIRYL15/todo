import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {Input} from "./Components/Input";
import {EditItem} from "./Components/EditIItem";

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
    const onClickRemoveTodolist = () => {props.removeTodolist(props.todolistId)}
    return (
        <div>
            <h3><EditItem title={props.title}/><button onClick={onClickRemoveTodolist}>X</button>
            </h3>
            <div><Input jopa={addTodolistTasks}/></div>
            <div>
                <ul>
                    {props.tasks.map(ts => {
                        const onPressRemoveTasksHandler = () => props.removeTasks(props.todolistId, ts.id)
                        const onChangeTasksHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.todolistId, ts.id, e.currentTarget.checked)
                        return <li key={ts.id}
                                   className={ts.isDone ? 'isDone' : ''}>
                            <input type="checkbox"
                                   checked={ts.isDone}
                                   onChange={onChangeTasksHandler}/>{/*галочка*/}
                            <EditItem title={ts.title}/>{/*надпись*/}
                            <button onClick={onPressRemoveTasksHandler}>X</button>
                            {/*кнопка для удаления тасок*/}
                        </li>
                    })}
                </ul>
            </div>
            <div>
                <button className={props.filter === 'all' ? 'activeFilter' : ''} onClick={onClickAllHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'activeFilter' : ''}
                        onClick={onClickActiveHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                        onClick={onClickCompletedHandler}>Completed
                </button>
            </div>
        </div>
    )
};

