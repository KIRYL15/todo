type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
type GenerationType = incrementAgeACType | incrementChildrenCountACType
export const userReducer = (state: StateType, action: GenerationType):StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE': {
            return {
                ...state,
                age: state.age + 1
            };
        }
        case 'INCREMENT-CHILDREN-COUNT': {
            return {
                ...state,
                name: action.payload.name
            };
        }
        default:
            throw new Error("I don't understand this type")
    }
}
type incrementAgeACType = ReturnType<typeof incrementAgeAC>
export const incrementAgeAC = (age:number, childrenCount:number, name:string)=>{
    return {
        type: 'INCREMENT-AGE',
        payload: {
            age,
            childrenCount,
            name,
        }
    }
}
type incrementChildrenCountACType = ReturnType<typeof incrementChildrenCountAC>
export const incrementChildrenCountAC = (age:number, childrenCount:number, name:string)=>{
    return {
        type: 'INCREMENT-CHILDREN-COUNT',
        payload: {
            age,
            childrenCount,
            name,
        }
    }
}
