import React, {useState} from 'react';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {Input} from "./Components/Input";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
type TasksStateType = {
    [key: string]: TasksType[]
}
export const App = () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolist, setTodolist] = useState<TodolistType[]>([
        {id: todolistId1, title: 'New what to learn', filter: 'all'},
        {id: todolistId2, title: 'OLD what to learn', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'Html & CSS', isDone: false},
            {id: v1(), title: 'JAVA', isDone: true},
            {id: v1(), title: 'PYTON', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Beer', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Fish', isDone: false},
            {id: v1(), title: 'Apple', isDone: false},
        ]
    })

    function removeTasks(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f => f.id !== id)})
        /*let newTodolist = tasks[todolistId]
        tasks[todolistId] = newTodolist.filter(f => f.id !== id)
        setTasks({...tasks})*/
    }// функция удаления таски при нажатии на кнопку Х
    function addTasks(todolistId: string, title: string) {
        let task = {id: v1(), title, isDone: true}
        setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]})
    }

    function changeStatus(todolistId: string, id: string, value: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === id ? {...m, isDone: value} : m)})
        // setTasks(tasks.map(m => m.id === id ? {...m, isDone: value} : m))
    }
    function removeTodolist(todolistId: string) {
        setTodolist(todolist.filter(f => f.id !== todolistId))
    }
    function changeFilter(todolistId: string, value: FilterType) {
        setTodolist(todolist.map(m => m.id === todolistId ? {...m, filter: value} : m))
    }
    function addTodolist(newTitle: string) {
        let newTodolist: TodolistType = {id: v1(), title: newTitle, filter: 'all'}
        setTodolist([newTodolist, ...todolist])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    return (
        <div className='App'>
            <Input jopa={addTodolist} />
            {
                todolist.map(m => {
                    //debugger
                    let tasksForTodolist = tasks[m.id]
                    if (m.filter === 'active') {
                        tasksForTodolist = tasks[m.id].filter(f => !f.isDone)
                    }
                    if (m.filter === 'completed') {
                        tasksForTodolist = tasks[m.id].filter(f => f.isDone)
                    }
                    return (
                        <Todolist
                            key={m.id} //обязательно, для внутрннего функционала
                            todolistId={m.id}
                            title={m.title}
                            tasks={tasksForTodolist}
                            changeFilter={changeFilter}
                            removeTasks={removeTasks}
                            addTasks={addTasks}
                            changeStatus={changeStatus}
                            filter={m.filter}
                            removeTodolist={removeTodolist}
                        />)
                })}
        </div>
    );
};

