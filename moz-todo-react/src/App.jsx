import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

function App(props) {
  
  const [filter, setFilter] = useState("All"); // Can be "All", "Active", or "Completed", default to "All"
  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };
  // Get the keys of the FILTER_MAP object
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  const filterList = FILTER_NAMES.map((name) => {
    return (
      <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
    )
  })

  const [tasks, setTasks] = useState(props.tasks);

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  function addTask(name) {
    const newKeyId = `todo-${nanoid()}`;
    const newTask = { id: newKeyId, name: name, completed: false, key: newKeyId };
    setTasks([...tasks, newTask]); // Add the new task to the existing tasks array
    // ... is spread notation, which takes the existing tasks array and adds the new task to it in a new array, and the notation is in square brackets to create a new array
  }

  function deleteTask(id) {
    // Rather than using the array method, we can use filter
    const updatedTasks = tasks.filter((task) => id !== task.id); // Keep the ones that don't match the id we want to delete
    setTasks(updatedTasks); // Replace the existing tasks array with the updatedTasks array
  }

  function editTask(id, newName) {
    const updatedTasks = tasks.map((task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task; // Return the original task if it's not the right one
    }))
    setTasks(updatedTasks);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task => { // Create a new array to replace the existing tasks array
      if (id === task.id) {
        return {...task, completed: !task.completed}; // Create a new object with the task properties by unraveling the existing task object
      }
      return task; // Return the existing task object if the id doesn't match -- don't change it
    }));
    setTasks(updatedTasks); // Replace the existing tasks array with the updatedTasks array
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul role="list" className="todo-list stack-large stack-exception"      aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
