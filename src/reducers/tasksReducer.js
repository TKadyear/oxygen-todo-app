/*
 * Estuve probando a poder poner de estado inicial unos datos que llegasen de un axios
 * y no funciono, por lo que esta era la mejor solución */

const initialState = [
  {
    'id': '0-creacion-header',
    'title': 'Creación del header',
    'tags': [
      {
        'name': 'urgente',
        'color': 'red'
      },
      {
        'name': 'dev',
        'color': 'blue'
      }
    ],
    'description': 'Creación de una barra de navegación y gestión de los diferentes enlaces dentro de la página',
    'creationDate': '2022/03/15',
    'done': false
  },
  {
    'id': '1-call-to-action-home',
    'title': 'Call-To-Action para Home',
    'tags': [
      {
        'name': 'medio',
        'color': 'yellow'
      },
      {
        'name': 'dev',
        'color': 'blue'
      }
    ],
    'description': 'Aplicación del diseño principal sobre el botón situado en el Hero',
    'creationDate': '2022/03/15',
    'done': false
  },
  {
    'id': '2-tablas-bd',
    'title': 'Creación de las tablas en la BD',
    'tags': [
      {
        'name': 'urgente',
        'color': 'red'
      }
    ],
    'description': 'A partir de los requerimientos técnicos,generar las tablas de la Base de datos',
    'creationDate': '2022/03/15',
    'done': false
  },
  {
    'id': '3-componente-card',
    'title': 'Componente Card',
    'tags': [
      {
        'name': 'bajo',
        'color': 'green'
      }
    ],
    'description': 'Maquetación y lógica del componente para el listado de las cards',
    'creationDate': '2022/03/15',
    'done': true
  },
  {
    'id': '4-imagenes-perfil',
    'title': 'Imágenes de Perfil',
    'tags': [
      {
        'name': 'medio',
        'color': 'yellow'
      },
      {
        'name': 'ui',
        'color': 'purple'
      }
    ],
    'description': 'Creación de las imágenes genéricas para la página de perfil',
    'creationDate': '2022/03/15',
    'done': true
  }
]

export function taskReducer(state = initialState, action) {
  switch (action.type) {
    case '@tasks/taskAdded': {
      console.log(action.data)
      return [...state, action.data.task]
    }
    case '@tasks/taskToggleDone': {
      const id = action.data.id
      return state.map(task => {
        if (task.id === id) {
          task.done = !task.done
        }
        return task;
      })
    }
    default:
      return state;
  }
}
export const toggleDone = (id) => {
  return {
    type: '@tasks/taskToggleDone',
    data: { id }
  }
}
export const addNewTask = (task) => {
  return {
    type: '@tasks/taskAdded',
    data: { task }
  }
}

