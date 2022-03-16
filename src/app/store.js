import { createStore } from 'redux'
import { composeWithDevTools } from "@redux-devtools/extension";
import { taskReducer } from '@/reducers/tasksReducer'
export const store = createStore(taskReducer, composeWithDevTools())

