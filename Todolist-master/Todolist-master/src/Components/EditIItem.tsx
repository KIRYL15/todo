import React, {useState} from 'react';
type EditIItemType = {
    title: string
}
export const EditItem = (props: EditIItemType) => {
    let [localTitle, setLocalTitle] = useState(props.title)
    let [editMode, setEditMode] = useState(true)
    const onEditMode = () => {
        setEditMode(!editMode)
    }
    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <span onDoubleClick={onEditMode}>{localTitle}</span>
            : <input onChange={changeTitle} onBlur={onEditMode} value={localTitle} autoFocus/>
    );
};

