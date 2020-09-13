import {STATUSES_REQUEST, STATUSES_RECEIVE} from '../actions/statuses';

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