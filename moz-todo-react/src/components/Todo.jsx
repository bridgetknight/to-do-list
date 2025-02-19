import { useEffect, useRef, useState } from "react";

function Todo(props) {
    
    const [isEditing, setEditing] = useState(false); // For the modal dialogue
    const [newName, setNewName] = useState(""); // For the dialogue input field

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    
    // Custom hook to get a component's previous state
    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const wasEditing = usePrevious(isEditing);

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input id={props.id} className="todo-text" onChange={handleChange} ref={editFieldRef} type="text" />
            </div>
            <div className="btn-group">
                <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
                Cancel
                <span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                Save
                <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );
    
    const viewTemplate = (
    <div className="stack-small">
        <div className="c-cb">
            <input
                id={props.id}
                type="checkbox"
                defaultChecked={props.completed}
                onChange={() => props.toggleTaskCompleted(props.id)}
            />
            <label className="todo-label" htmlFor={props.id}>
                {props.name}
            </label>
        </div>
        <div className="btn-group">
            <button type="button" className="btn" ref={editButtonRef} onClick={() => setEditing(true)}>
                Edit <span className="visually-hidden">{props.name}</span>
            </button>
            <button
                type="button"
                className="btn btn__danger"
                onClick={() => props.deleteTask(props.id)}>
                Delete <span className="visually-hidden">{props.name}</span>
            </button>
        </div>
    </div>
    );

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus(); // Set the edit field to focus using the reference we set
        } else if (wasEditing && !isEditing){
            editButtonRef.current.focus(); // Set the edit button to focus using the reference we set
        } // Else keep the focus in the default state
    }, [isEditing]);

    return (
        <li className="todo">
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
}

export default Todo;