import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import { store } from './app/store'
import { toggleDone, addNewTask } from './reducers/tasksReducer';
//  COMPONENTE BARRA DE NAVEGACIÓN
const NavBar = () => {
  return (
    <nav className='flex flex-row justify-between flex-wrap  items-center p-4 bg-indigo-400 text-white shadow'>
      <div className='flex flex-row justify-center items-center text-indigo-800 font-bold text-xl'>
        <img src='/logo.svg' alt='Logo Todo app' />
        ToDoApp
      </div>
      <div className='flex flex-row justify-around gap-2'>
        <Link to='/'>New task</Link>
        <Link to='/view-tasks'>View Tasks</Link>
      </div>
    </nav>
  );
}
// Función para poner un color aleatorio ya que no se ha puesto ningun selector de color.
const randomColor = () => {
  const listColors = ['red', 'blue', 'orange', 'green', 'yellow', 'purple', 'pink', 'darkBlue']
  const randomNumber = Math.floor(Math.random() * listColors.length)
  return listColors[randomNumber]
}

// COMPONENTES
// Tags
const TaskTags = (props) => {
  //Clase de CSS de Tailwind
  const colors = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    darkBlue: 'bg-slate-800'
  }
  const renderedTags = props.tags.map(tag => {
    const tagColor = tag.color ? colors[tag.color] : colors[randomColor()]
    return <span key={tag.name} className={`tags ${tagColor}`} > {tag.name}</span >
  })
  return renderedTags;
}
// TARJETAS DE TAREAS
const CardTask = (props) => {
  return (
    <div className='bg-white rounded-2xl w-11/12'>
      <div className='px-4'>
        <p className='font-bold'>{props.task.title}</p>
        <hr />
        <div className='my-2 flex flex-row flex-wrap gap-1'>
          <TaskTags tags={props.task.tags}></TaskTags>
        </div>
        <p className='text-sm'>{props.task.description}</p>
      </div>
      <button onClick={() => props.onClick(props.task.id)} className={`w-full rounded-b-2xl py-1 text-white ${props.task.done ? 'bg-orange-500' : 'bg-green-500'}`}>{props.task.done ? 'DONE' : 'TO-DO'}</button>
    </div>
  )
}
// LISTADO DE TAREAS DEPENDIENDO SI ESTAN HECHAS O NO
const TasksList = (props) => {
  const listTask = useSelector(state => state.filter(task => task.done === props.done))
  const handleClick = (id) => {
    store.dispatch(toggleDone(id))
  }
  const renderedTasks = listTask.map(task => <CardTask key={task.id} task={task} onClick={(i) => handleClick(i)}></CardTask>)
  return (
    <div className='bg-blue-500 pb-8 pt-2 flex flex-col items-center gap-3 w-full md:w-5/12'>
      <div className='text-white text-center font-bold w-full'>
        <p> {props.done ? 'DONE' : 'TO-DO'}</p>
        <hr className='w-full' />
      </div>
      {renderedTasks}
    </div>
  )
}
// PÁGINAS
// LISTADO DE TAREAS
const ViewAllTasks = () => {
  return (
    <>
      <main>
        <TasksList done={false}></TasksList>
        <TasksList done={true}></TasksList>
      </main>
    </>
  )
}
// HOME- FORMULARIO DE NUEVAS TAREAS
const NewTask = () => {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [allTags, setAllTags] = useState({ tags: [] });

  const handleChange = (e) => {
    const type = e.target.name;
    const value = e.target.value;
    switch (type) {
      case 'title': {
        return setTitle(value);
      }
      case 'description': {
        return setDescription(value);
      }
      case 'tags': {
        setTag(value);
        const listTags = value.split(',').map(nameTag => {
          return { name: nameTag, color: randomColor() }
        });
        return setAllTags(listTags);
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title != '' && allTags.length != 0 && description != '') {
      const ID = title.replace(/ /g, '-');
      const formData = {
        id: ID,
        title: title,
        tags: allTags,
        description: description,
        done: false
      };
      setTitle('');
      setDescription('');
      setAllTags([]);
      setTag('');
      store.dispatch(addNewTask(formData));
    }
  }
  // A los inputs les he agregado el value para poder controlar con React lo que se ve en el input y asegurarme que funciona.
  return (
    <>
      <main className='h-[calc(100vh-4rem-3.5rem)]'>
        <div className='bg-blue-500 shadow-md md:w-3/4 text-white'>
          <h1>Create</h1>
          <hr />
          <form className='flex flex-col lg:flex-row gap-2 p-8'>
            <div>
              <label>
                Título
                <input onChange={handleChange} placeholder='Título de la tarea' type='text' value={title} name='title' required />
              </label>
              <label>
                Tags
                <input onChange={handleChange} placeholder='Separa los tags mediante comas' type='text' value={tag} name='tags' required />
              </label>
            </div>
            <div>
              <label>
                Descripción
                <textarea onChange={handleChange} className='h-24' value={description} name='description' placeholder='Describe la tarea'></textarea>
              </label>
              <input type='submit' value='Enviar' onClick={(e) => handleSubmit(e)} className=' bg-green-900 border-green-900 py-1 px-8 text-white font-bold border-2  rounded hover:bg-white hover:text-green-900' />
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<NewTask />} />
        <Route path='view-tasks' element={<ViewAllTasks />} />
      </Routes>
      <footer> Todos los derechos reservados 2021</footer>
    </BrowserRouter>
  )
}

export default App;

