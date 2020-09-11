import {
    AUTHORIZATION_REQUEST, 
    AUTHORIZATION_ERROR, 
    AUTHORIZATION_LOGIN, 
    AUTHORIZATION_LOGOUT
} from '../actions/authorization';
import {
    backendSignIn, 
    backendSignUp, 
    backendGetUserInfo, 
    backendGetStatuses,  
    backendGetDataCards,
    backendGetUsersAppData
} from '../../networkFunctions';
import {userInfoRequest, userInfoReceive} from '../actionsCreators/userInfo';
import {statusesRequest, statusesReceive} from '../actionsCreators/statuses';
import {cardsRequest, cardsReceive} from '../actionsCreators/cards';
import {usersAppRequest, usersAppReceive} from '../actionsCreators/usersApp';

function authorizationRequest() {
    return {type: AUTHORIZATION_REQUEST}
}

function authorizationLogIn() {
    return {type: AUTHORIZATION_LOGIN}
}

function authorizationLogOut() {
    return {type: AUTHORIZATION_LOGOUT}
}

function authorizationError(error) {
    return {type: AUTHORIZATION_ERROR, error}
}

function asyncGetAppData() {
    return dispatch => {
        dispatch(statusesRequest());

        backendGetStatuses().then((statuses) => {
            dispatch(statusesReceive(statuses));
            dispatch(cardsRequest());

            return backendGetDataCards();
        }).then((cards) => {
            dispatch(cardsReceive(cards));
            dispatch(usersAppRequest());

            return backendGetUsersAppData();
        }).then((usersApp) => {
            dispatch(usersAppReceive(usersApp));                
        });
    }    
}

export function authorization() {
    return dispatch => {
        dispatch(authorizationRequest());

        let email = localStorage.getItem('email');

        if (email) {
            dispatch(authorizationLogIn());
            dispatch(userInfoRequest());
            
            backendGetUserInfo({email}).then((userInfo) => {
                dispatch(userInfoReceive(userInfo));

                dispatch(asyncGetAppData());
            });
        }
        else {
            dispatch(authorizationError());
        }
    }
}

function getFunctionSign(sign) {
    return (email, password, error) => {

        return dispatch => {
            dispatch(authorizationRequest());
            dispatch(userInfoRequest());
    
            sign({email, password}).then((userInfo) => {
                if (userInfo) {
                    localStorage.setItem('email', email);
    
                    dispatch(authorizationLogIn());
                    dispatch(userInfoReceive(userInfo));
    
                    dispatch(asyncGetAppData());
                }
                else {
                    dispatch(authorizationError(error));
                }            
            });
        } 
    }
}

export function signIn(email, password) {
    return dispatch => {
        dispatch(getFunctionSign(backendSignIn)(email, password, 'Wrong rassword or email!'));
    }
}

export function signUp(email, password) {
    return dispatch => {
        dispatch(getFunctionSign(backendSignUp)(email, password, 'Error registration!'));
    }
}

export function logOut() {
    localStorage.removeItem('email');

    return dispatch => {
        dispatch(authorizationLogOut());
    }
}