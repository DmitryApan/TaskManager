import {urlCardData, urlCardCreate, urlCardSettings, urlSignUp, urlLogin, urlUserInfo, urlUsersInfo, urlStatusesUpdate} from './Data';

function serverRequest({url, method = 'GET', headers, body}) {    
    return fetch(url, {
        method,
        headers,
        body
    }).catch(error => {
        throw new Error('Response Error!');
    });
}

function jsonRequest(response) {
    return response.json().catch(error => {
        throw new Error('Json Error!');
    });   
}

export function backendGetStatuses() {
    return serverRequest({url: urlCardSettings}).then((response) => {
        return response.ok && jsonRequest(response);
    });
}

export function backendChangeStatuses(body) {
    return serverRequest({
        url: urlStatusesUpdate,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({statuses: body})
    }).then(response => {
        return response.ok && jsonRequest(response);
    });
}

export function backendGetDataCards() {
    return serverRequest({url: urlCardData}).then((response) => {
        return response.ok && jsonRequest(response);
    });
}

export function backendCardCreate(body) {
    return serverRequest({
        url: urlCardCreate, 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        return response.ok && jsonRequest(response);
    });
}

export function backendCardDelete(id) {
    return serverRequest({
        url: `${urlCardCreate}/${id}`,
        method: 'DELETE'
    }).then((response) => {
        return response.ok && jsonRequest(response);
    });
}

export function backendSignIn(body) {
    return serverRequest({
        url: urlLogin,        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        return response.ok && jsonRequest(response);
    });
}

export function backendSignUp(body) {
    return serverRequest({
        url: urlSignUp,        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        return response.ok && jsonRequest(response);
    });
}

export function backendCardChange(id, body) {
    return serverRequest({
        url: `${urlCardCreate}/${id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)                
    }).then((response) => {
        return response.ok && jsonRequest(response);
    });
}

export function backendGetUserInfo(body) {
    return serverRequest({
        url: urlUserInfo,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        return response.ok && jsonRequest(response);
    });
}

export function backendSetUserInfo(body) {
    return serverRequest({
        url: urlUserInfo,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        return response.ok && jsonRequest(response);
    });
}

export function backendGetUsersAppData() {
    return serverRequest({url: urlUsersInfo}).then((response) => {
        return response.ok && jsonRequest(response);
    });
}