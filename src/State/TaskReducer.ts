import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolist-reducer";

type GeneralType = removeTasksACType
    | addTasksACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | removeTodolistACType
    | addTodolistACType

export const TaskReducer = (state: TasksStateType, action: GeneralType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
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
            return state
    }
}
type removeTasksACType = ReturnType<typeof removeTasksAC>
export const removeTasksAC = (todolistId: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            id
        }
    } as const
}

type addTasksACType = ReturnType<typeof addTasksAC>
export const addTasksAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            title
        }
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK',
        payload: {
            todolistId,
            id,
            isDone,
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