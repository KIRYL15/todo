import {v1} from "uuid";
import {FilterType} from "../App";
type GeneralType = removeTodolistACType
    | addTodolistACType
    | updateTodolistACType
    | changeFilterACType
export const TodolistReducer = (state: any, action: GeneralType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let newState = [...state]
            return newState.filter(f => f.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            let newState = [...state]
            let newTodolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [newTodolist,...newState]
        }
        case 'UPDATE-TODOLIST': {
            let newState = [...state]
            return newState.map((m) => m.id === action.payload.todolistId ? {...m, title: action.payload.title} : m)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let newState = [...state]
            return newState.map(m => m.id === action.payload.todolistId ? {...m, filter: action.payload.value} : m)
        }
        default:
            return state
    }
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            id: v1()
        }
    } as const
}

type updateTodolistACType = ReturnType<typeof updateTodolistAC>
export const updateTodolistAC = (todolistId: string, title: string) => {
    return {
        type: 'UPDATE-TODOLIST',
        payload: {
            title,
            todolistId
        }
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, value: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            value,
            todolistId
        }
    } as const
}