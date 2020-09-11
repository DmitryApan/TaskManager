import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logOut} from './store/actionsCreators/authorization';

function LogOut(props) {
    props.logOut();

    return (
        <Redirect to="/login" />
    )
}

const actionsCreators = {
    logOut
};

export default connect(null, actionsCreators)(LogOut);