import React, {useState} from 'react';

type EditableSpanType = {
    title: string
    callBack: (title: string)=>void
    // onChange: (newValue: string) => void
}
export const EditableSpan = (props: EditableSpanType) => {
    let [editMode, setEditMode] = useState(false)
    let [localTitle, setLocalTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(!editMode);
        props.callBack(localTitle)
    }
    const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
        setLocalTitle(e.currentTarget.value)
    return (
        editMode
            ? <input onChange={changeTitleHandler}
                     onBlur={activateEditMode}
                     value={localTitle}
                     autoFocus/>
            : <span onDoubleClick={activateEditMode}>{localTitle}</span>)
}

