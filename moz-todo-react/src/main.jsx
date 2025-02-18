import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// For testing purposes:
const DATA = [
  { id: "todo-0", name: "Feed the cats", completed: true },
  { id: "todo-1", name: "Write some code", completed: false },
  { id: "todo-2", name: "Read a book", completed: false } 
]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App tasks={DATA} />
  </StrictMode>,
)

