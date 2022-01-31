import React, {useReducer} from 'react';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItenForm} from "./Components/AddItenForm";
import {addTasksAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, TaskReducer} from "./State/TaskReducer";
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    TodolistReducer,
    updateTodolistAC
} from "./State/TodolistReducer";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: TasksType[]
}
export const App = () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    /* let [todolist, setTodolist] = useState<TodolistType[]>([
         {id: todolistId1, title: 'New what to learn', filter: 'all'},
         {id: todolistId2, title: 'OLD what to learn', filter: 'all'}
     ])*/
    let [todolist, todolistDispatch] = useReducer(TodolistReducer, [
        {id: todolistId1, title: 'New what to learn', filter: 'all'},
        {id: todolistId2, title: 'OLD what to learn', filter: 'all'}
    ])
    const [tasks, tasksDispatch] = useReducer(TaskReducer, {
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

    // функция удаления таски при нажатии на кнопку
    function removeTasks(todolistId: string, id: string) {
        tasksDispatch(removeTasksAC(todolistId, id))
    }

    // функция добавления таски при нажатии на кнопку
    function addTasks(todolistId: string, title: string) {
        tasksDispatch(addTasksAC(todolistId, title))
    }

    // функция статуса таски: тру или фолс
    function changeStatus(todolistId: string, id: string, isDone: boolean) {
        tasksDispatch(changeTaskStatusAC(todolistId, id, isDone))
    }

    // функция изменения названия таски
    const updateTask = (todolistId: string, id: string, title: string) => {
        tasksDispatch(changeTaskTitleAC(todolistId, id, title))
    }

    // функция удаления тудулиста при нажатии на кнопку
    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        todolistDispatch(action)
        tasksDispatch(action)
        //setTodolist(todolist.filter(f => f.id !== todolistId))
    }

    // функция фильтрации тудулиста
    function changeFilter(todolistId: string, value: FilterType) {
        const action = changeFilterAC(todolistId, value)
        todolistDispatch(action)
        //setTodolist(todolist.map(m => m.id === todolistId ? {...m, filter: value} : m))
    }

    // функция добавления тудулиста
    function addTodolist(newTitle: string) {
        const action = addTodolistAC(newTitle)
        todolistDispatch(action)
        tasksDispatch(action)
        //let newId = v1()
        //setTodolist([{id: newId, title: newTitle, filter: 'all'}, ...todolist])
        // setTasks({...tasks, [newId]:[]})
    }

    const updateTodolist = (todolistId: string, title: string) => {
        const action = updateTodolistAC(todolistId, title)
        todolistDispatch(action)
        //setTodolist(todolist.map(m => m.id === todolistId ? {...m, title} : m))
    }

    return (
        <div className='App'>
            <AddItenForm addItem={addTodolist}/>
            {
                todolist.map(m => {
                    let tasksForTodolist = tasks[m.id]
                    let allTodolistTasks = tasksForTodolist
                    if (m.filter === 'active') {
                        tasksForTodolist = allTodolistTasks.filter(f => !f.isDone)
                    }
                    if (m.filter === 'completed') {
                        tasksForTodolist = allTodolistTasks.filter(f => f.isDone)
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
                            updateTask={updateTask}
                            updateTodolist={updateTodolist}
                        />)
                })}
        </div>
    );
};

