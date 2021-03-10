import {createStore, applyMiddleware} from 'redux'
import {combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

import authorization from './reducers/authorization';
import userInfo from './reducers/userInfo';
import settings from './reducers/settings';
import cards from './reducers/cards';
import usersApp from './reducers/usersApp';

const store = createStore(
    combineReducers({
        authorization,
        userInfo,
        settings,
        cards,
        usersApp
    }), 
    applyMiddleware(
        thunkMiddleware
    )
);

export default store;