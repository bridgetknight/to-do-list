import { useState } from "react";

function Form(props) {
    const [name, setName] = useState("");

    function handleSubmit(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        props.addTask(name); // Pass the name up to the parent component
        setName(""); // Reset the input after submitting
    }

    function handleChange(e) {
        setName(e.target.value);
    }
    
    return (
        <form>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
                placeholder="e.g. Feed the cats"
            />
            <button type="submit" className="btn btn__primary btn__lg" onClick={handleSubmit}>
                Add
            </button>
        </form>
    )
}



export default Form;