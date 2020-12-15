import {STATUSES_REQUEST, STATUSES_RECEIVE, STATUSES_CHANGE} from '../actions/statuses';
import {backendChangeStatuses} from '../../networkFunctions';

function changeStatuses(statuses) {
    return {
        type: STATUSES_CHANGE,
        statuses
    }
}

export function statusesRequest() {
    return {
        type: STATUSES_REQUEST
    }
}

export function statusesReceive(statuses) {
    return {
        type: STATUSES_RECEIVE,
        statuses
    }
}

export function addStatus(status) {
    return (dispatch, getState) => {
        const statuses = getState().statuses.data;

        backendChangeStatuses([...statuses, status]).then(({statuses}) => {
            dispatch(changeStatuses(statuses));
        });
    }
}

export function deleteStatus(name) {
    return (dispatch, getState) => {
        const statuses = getState().statuses.data;
        const newStatuses = statuses.filter(status => status.name !== name);

        backendChangeStatuses(newStatuses).then(({statuses}) => {
            dispatch(changeStatuses(statuses));
        });
    }
}

export function enableStatus(name, value) {
    return (dispatch, getState) => {
        const statuses = getState().statuses.data;
        const newStatuses = statuses.map(status => ({
            ...status,
            enabled: status.name !== name ? status.enabled : value
        }));

        backendChangeStatuses(newStatuses).then(({statuses}) => {
            dispatch(changeStatuses(statuses));
        });
    }
}