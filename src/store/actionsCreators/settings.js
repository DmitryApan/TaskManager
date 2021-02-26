import {SETTINGS_REQUEST, SETTINGS_RECEIVE, SETTINGS_CHANGE} from '../actions/settings';
import {backendChangeSettingsByKey} from '../../networkFunctions';

function changeSettings(settings) {
    return {
        type: SETTINGS_CHANGE,
        settings
    }
}

export function settingsRequest() {
    return {
        type: SETTINGS_REQUEST
    }
}

export function settingsReceive(settings) {
    return {
        type: SETTINGS_RECEIVE,
        settings
    }
}

function changeSettingsByKey(key, body) {
    return (dispatch, getState) => {
        dispatch(changeSettings({
            ...getState().settings.data,
            [key]: body
        }));
    }
}

export function addStatus(status) {
    return (dispatch, getState) => {
        const statuses = getState().settings.data.statuses;

        backendChangeSettingsByKey('statuses', [...statuses, status]).then(({statuses}) => {
            dispatch(changeSettingsByKey('statuses', statuses));
        });
    }
}

export function deleteStatus(name) {
    return (dispatch, getState) => {
        const statuses = getState().settings.data.statuses;
        const newStatuses = statuses.filter(status => status.name !== name);

        backendChangeSettingsByKey('statuses', newStatuses).then(({statuses}) => {
            dispatch(changeSettingsByKey('statuses', statuses));
        });
    }
}

export function enableStatus(name, value) {
    return (dispatch, getState) => {
        const statuses = getState().settings.data.statuses;
        const newStatuses = statuses.map(status => ({
            ...status,
            enabled: status.name !== name ? status.enabled : value
        }));

        backendChangeSettingsByKey('statuses', newStatuses).then(({statuses}) => {
            dispatch(changeSettingsByKey('statuses', statuses));
        });
    }
}

export function enableWebSocket(value) {
    return (dispatch, getState) => {
        const webSocket = getState().settings.data.webSocket;

        backendChangeSettingsByKey('webSocket', {
            ...webSocket, 
            enabled: value
        }).then(({webSocket}) => {
            dispatch(changeSettingsByKey('webSocket', webSocket));
        });

        console.log('WS');
    }
}