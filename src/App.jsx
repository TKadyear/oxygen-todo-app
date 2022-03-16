import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
const listTask = [
  {
    title: "Título de la tarea",
    tags: [
      {
        "tag": "Nombre de la etiqueta",
        "color": "Color",
        "prioridad": "tipo de prioridad?"
      }
    ],
    description: "Descripción de la tarea",
    done: false
  },
  {
    title: "Creación del header",
    tags: [
      {
        "tag": "Urgente",
        "prioridad": "Red"
      },
      {
        "tag": "dev",
        "prioridad": "Red"
      }
    ],
    description: "Creación de una barra de navegación y gestión de los diferentes enlaces dentro de la página",
    "creationDate": "2022/03/15",
    done: false
  },
  {
    title: "Call-To-Action para Home",
    tags: [
      {
        "tag": "medio",
        "prioridad": "yellow"
      },
      {
        "tag": "dev",
        "prioridad": "blue"
      }
    ],
    description: "Aplicación del diseño principal sobre el botón situado en el Hero",
    "creationDate": "2022/03/15",
    done: false
  },
  {
    title: "Creación de las tablas en la BD",
    tags: [
      {
        "tag": "Urgente",
        "prioridad": "Red"
      }
    ],
    description: "A partir de los requerimientos técnicos,generar las tablas de la Base de datos",
    "creationDate": "2022/03/15",
    done: false
  },
  {
    title: "Componente Card",
    tags: [
      {
        "tag": "bajo",
        "prioridad": "green"
      }
    ],
    description: "Maquetación y lógica del componente para el listado de las cards",
    "creationDate": "2022/03/15",
    "done": true
  },
  {
    title: "Imágenes de Perfil",
    tags: [
      {
        "tag": "medio",
        "prioridad": "yellow"
      },
      {
        "tag": "ui",
        "prioridad": "Red"
      }
    ],
    description: "Creación de las imágenes genéricas para la página de perfil",
    "creationDate": "2022/03/15",
    "done": true
  }
]



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
      <main className='w-3/4 mx-auto'>
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

function CardTask(props) {
  return (
    <div className='bg-white  rounded-2xl w-11/12'>
      <div className="p-4">
        <p>{props.task.title}</p>
        <hr />
        <div className="tags"></div>
        <p>{props.task.description}</p>
        <p>{props.task.creationDate}</p>
      </div>
      <button onClick={() => {
        props.task.done = !props.task.done
        console.log(props.task.title, !props.task.done)
      }} className='bg-green-100 w-full rounded-b-2xl'>{props.task.done ? 'DONE' : 'TO-DO'}</button>
    </div>
  )
}
function TasksList(props) {
  const tasks = [...listTask]
  const renderedTasks = tasks.map(task => {
    if (task.done === props.done) {
      return <CardTask key={task.title} task={task}></CardTask>
    }
  })
  return (
    <div className='bg-blue-500 py-4 flex flex-col items-center gap-3 w-full md:w-5/12'>
      <p className='text-white font-bold'>TO DO</p>
      <hr className='w-full' />
      {renderedTasks}
    </div>
  )
}
function ViewTasks() {
  return (
    <>
      <main className='w-3/4 mx-auto  flex flex-col justify-center gap-3 md:flex-row md:justify-around md:items-start py-10'>
        <TasksList done={false}></TasksList>
        <TasksList done={true}></TasksList>
      </main>

    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <div className="bg-gray-300">
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
