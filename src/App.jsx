import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import './App.css'

function NavBar() {
  return (
    <nav className="flex flex-row justify-around flex-wrap  items-center py-4 bg-indigo-400 text-white shadow">
      <div className='flex flex-row justify-center items-center text-indigo-800 font-bold text-xl'>
        <img src="/logo.svg" alt="Logo Todo app" />
        ToDoApp
      </div>
      <div className='flex flex-row justify-around gap-2'>
        <Link to="/">New task</Link>
        <Link to="/view-tasks">View Tasks</Link>
      </div>
    </nav>
  );
}

function NewTask() {
  return (
    <>
      <main>
        <div className="container bg-indigo-600 shadow-md  px-8 pt-6 pb-8 mb-4 text-white">
          <h1>Create</h1>
          <hr />
          <form action="" className=' px-8 pt-6 pb-8 mb-4 '>
            <label className='block  text-sm mb-2'>
              Título
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" name="title" id="" />
            </label>
            <label className='block text-sm mb-2'>
              Tags
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" name="tags" id="" />
            </label>
            <label className='block text-sm mb-2'>
              Descripción
              <input className='h-20 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" name="description" id="" size="4" />
            </label>
          </form>
          <button className=' bg-green-900 border-green-900 py-1 px-8 text-white font-bold border-2  rounded hover:bg-white hover:text-green-900'>Enviar</button>
        </div>
      </main>
    </>
  );
}
function TaskTags(props) {
  const colors = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    darkBlue: "bg-slate-800"
  }
  const renderedTags = props.tags.map(tag => <span key={tag.name} className={`tags ${colors[tag.color]}`} > {tag.name}</span >)
  return renderedTags;
}

function CardTask(props) {
  return (
    <div className='bg-white rounded-2xl w-11/12'>
      <div className="px-4">
        <p className='font-bold'>{props.task.title}</p>
        <hr />
        <div className="my-2 flex flex-row flex-wrap gap-1">
          <TaskTags tags={props.task.tags}></TaskTags>
        </div>
        <p>{props.task.description}</p>
        <p>{props.task.creationDate}</p>
      </div>
      <button onClick={() => props.onClick(props.task.id)} className={`w-full rounded-b-2xl py-1 text-white ${props.task.done ? "bg-orange-500" : "bg-green-500"}`}>{props.task.done ? 'DONE' : 'TO-DO'}</button>
    </div>
  )
}

function TasksList(props) {
  const renderedTasks = props.listTask.map(task => {
    if (task.done === props.done) {
      return <CardTask key={task.id} task={task} onClick={(i) => props.onClick(i)}></CardTask>
    }
  })
  return (
    <div className='bg-blue-500 py-4 flex flex-col items-center gap-3 w-full md:w-5/12'>
      <p className='text-white font-bold'>{props.done ? "DONE" : "TO-DO"}</p>
      <hr className='w-full' />
      {renderedTasks}
    </div>
  )
}
class ViewAllTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTask: [],
    };
  }
  componentDidMount() {
    const URL = '/data/todo-data.json'
    fetch(URL)
      .then(response => response.json())
      .then(
        (result) => {
          result.forEach(task => task.id = task.title.replaceAll(' ', '-'))
          this.setState({
            listTask: this.state.listTask.concat(result),
          })
        }
        ,
        (error) => {
          console.error({ isLoaded: true, payload: error })
        }
      )
  }
  handleClick(id) {
    const updatedTask = [...this.state.listTask].map(task => {
      if (task.id === id) {
        task.done = !task.done
      }
      return task;
    })
    this.setState({
      listTask: updatedTask,
    })
    console.log(id)
  }
  render() {
    return (
      <>
        <main>
          <TasksList done={false} listTask={this.state.listTask} onClick={(i) => this.handleClick(i)}></TasksList>
          <TasksList done={true} listTask={this.state.listTask} onClick={(i) => this.handleClick(i)}></TasksList>
        </main>
      </>
    )
  }
}
function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <div className="bg-gray-300">
        <Routes>
          <Route path="/" element={<NewTask />} />
          <Route path="view-tasks" element={<ViewAllTasks />} />
        </Routes>
      </div>
      <footer> Todos los derechos reservados 2021</footer>
    </BrowserRouter>
  )
}

export default App
