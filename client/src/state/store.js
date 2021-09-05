import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import AuthReducer from "./reducers/authReducer";
import logger from 'redux-logger'


const reducers = combineReducers({auth: AuthReducer});


export const initStore = () => {
   return createStore(
       reducers,
       composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
   )
};