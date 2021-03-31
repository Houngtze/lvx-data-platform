import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'

const initState = {}

export const initStore = () => createStore(reducers, initState, applyMiddleware(ReduxThunk))
