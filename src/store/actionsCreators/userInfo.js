import {USER_INFO_REQUEST, USER_INFO_RECEIVE, USER_INFO_DATA_CHANGE} from '../actions/userInfo';
import {backendSetUserInfo} from '../../networkFunctions';

export function userInfoRequest() {
    return {
        type: USER_INFO_REQUEST
    }
}

export function userInfoReceive(userInfo) {
    return {
        type: USER_INFO_RECEIVE,
        userInfo
    }
}

function getFunctionChangeUserInfoByKey(key) {
    return value => {

        return (dispatch, getState) => {
            backendSetUserInfo({
                email: getState().userInfo.data.email,
                [key]: value
            }).then((userInfo) => {
                dispatch({
                    type: USER_INFO_DATA_CHANGE,
                    userInfo
                });
            });
        }
    }
}

export function changeUserInfoAvatar(avatar) {
    return dispatch => {
        dispatch(getFunctionChangeUserInfoByKey('avatar')(avatar));
    }
}

export function changeUserInfoName(name) {
    return dispatch => {
        dispatch(getFunctionChangeUserInfoByKey('name')(name));
    }
}

export function changeUserInfoPassword(password) {
    return dispatch => {
        dispatch(getFunctionChangeUserInfoByKey('password')(password));
    }
}