import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
function NavBar() {
  return (
    <nav className="flex flex-row justify-around flex-wrap  items-center py-4 bg-indigo-400 text-white">
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
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" name="description" id="" />
            </label>

            <button className='bg-green-900 border-green-900 py-1 px-8 text-white font-bold border-2  rounded hover:bg-white hover:text-green-900'>Enviar</button>
          </form>
        </div>
      </main>
    </>
  );
}

function CardTask() {
  return (
    <div className='bg-white  rounded-2xl w-11/12'>
      <div className="p-4">
        <p>Title</p>
        <hr />
        <div className="tags"></div>
        <p>Description</p>
        <p>Date</p>
      </div>
      <button className='bg-green-100 w-full rounded-b-2xl'>Done</button>
    </div>
  )
}
function ViewTasks() {
  return (
    <>
      <main className='flex flex-col justify-center gap-3'>
        <div>
          <p>TO DO</p>
          <CardTask></CardTask>
        </div>
        <div >
          <p>DONE</p>
          <CardTask></CardTask>
        </div>
      </main>

    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <div className="App h-screen bg-gray-300">
        <Routes>
          <Route path="/" element={<NewTask />} />
          <Route path="view-tasks" element={<ViewTasks />} />
        </Routes>
      </div>
      <footer className="flex flex-row justify-center py-4 bg-gray-400 text-white"> Todos los derechos reservados 2021</footer>
    </BrowserRouter>
  )
}

export default App
