import {urlCardData, urlCardCreate, urlCardSettings} from './Data';

async function serverRequest({url, json = true, method = "GET", headers, body}) {    
    let response = await fetch(url, {
        method,
        headers,
        body
    }).catch(error => {
        throw new Error('Response Error!');
    });

    if (!json) {
        return response;
    }                    

    let jsonObj = await response.json().catch(error => {
        throw new Error('Json Error!');
    });   

    return jsonObj;
}

export function getSettings() {
    return serverRequest({url: urlCardSettings});
}

export function getDataCards() {
    return serverRequest({url: urlCardData});
}

export function cardCreate(body) {
    return serverRequest({
        url: urlCardCreate, 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(body)
    });
}

export async function cardDelete(id) {
    return (await serverRequest({
        url: `${urlCardCreate}/${id}`,
        json: false,
        method: 'DELETE'
    })).ok;
}