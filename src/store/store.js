import {createStore, applyMiddleware} from 'redux'
import {combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

import authorization from './reducers/authorization';
import userInfo from './reducers/userInfo';
import statuses from './reducers/statuses';
import cards from './reducers/cards';
import usersApp from './reducers/usersApp';

const store = createStore(
    combineReducers({
        authorization,
        userInfo,
        statuses,
        cards,
        usersApp
    }), 
    applyMiddleware(
        thunkMiddleware
    )
);

export default store;