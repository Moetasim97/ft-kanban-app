import thunk from "redux-thunk"
import { applyMiddleware,createStore,compose, combineReducers } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';
import kanBanReducer from "./ReducerCollection"



const middleware = [thunk];

const store=createStore(
    combineReducers({kanBanReducer}),
    composeWithDevTools(applyMiddleware(...middleware))
)



export default store