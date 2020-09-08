import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import {logOut} from './store/actionsCreators/authorization';

function LogOut(props) {
    props.logOut();

    return (
        <Redirect to="/login" />
    )
}

const mapDispatchToProps = dispatch => ({
    logOut: bindActionCreators(logOut, dispatch)
});

export default connect(null, mapDispatchToProps)(LogOut);