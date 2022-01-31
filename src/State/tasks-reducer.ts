import {TasksStateType} from '../App';
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolist-reducer";

type GeneralType = removeTasksACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodolistACType
    | removeTodolistACType

export const tasksReducer = (state: TasksStateType, action: GeneralType) => {
    switch (action.type) {
        case 'REMOVE-TASKS': {
            let newState = {...state}
            return {
                ...newState,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.id)
            }
        }
        case 'ADD-TASK': {
            let newState = {...state}
            let newTodolist = {id: v1(), title: action.payload.title, isDone: false}
            return {...newState, [action.payload.todolistId]: [newTodolist, ...state[action.payload.todolistId]]}
        }
        case 'CHANGE-TASK': {
            let newState = {...state}
            return {
                ...newState, [action.payload.todolistId]: newState[action.payload.todolistId]
                    .map(m => m.id === action.payload.id ? {...m, isDone: action.payload.isDone} : m)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            let newState = {...state}
            return {
                ...newState, [action.payload.todolistId]: newState[action.payload.todolistId]
                    .map(m => m.id === action.payload.id ? {...m, title: action.payload.title} : m)
            }
        }
        case 'ADD-TODOLIST': {
            let newState = {...state}
            return {...newState, [action.payload.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            let newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        default:
            throw state
    }
}

type removeTasksACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASKS',
        payload: {
            id,
            todolistId
        }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK',
        payload: {
            id,
            isDone,
            todolistId
        }
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, id: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            id,
            title,
        }
    } as const
}