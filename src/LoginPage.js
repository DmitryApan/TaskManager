import React, {useCallback, useState} from 'react';
import {Link, useParams, Redirect} from 'react-router-dom';
import {signIn, signUp} from './store/actionsCreators/authorization';
import {connect} from 'react-redux';

function LoginPage(props) {
    let {signIn, signUp, error} = props;
    let {page} = useParams();
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleChangeEmail = useCallback(({target}) => {
        setEmail(target.value);
    }, [setEmail]);

    const handleChangePassword = useCallback(({target}) => {
        setPassword(target.value);
    }, [setPassword]);

    const handleOnSubmitLoginForm = useCallback((event) => {
        event.preventDefault();

        if (page === 'login') {
            signIn(email, password);
        }
        else if (page === 'register') {
            signUp(email, password);
        }
    }, [page, signIn, signUp, email, password]);

    const getLinkText = useCallback(() => (page === 'login') ? 'SignUp?' : 'Login', [page]);
    const getButtonText = useCallback(() => (page === 'login') ? 'Login' : 'SignUp', [page]);
    const getUrlLink = useCallback(() => (page === 'login') ? '/register' : '/login', [page]);

    return (
        <> 
            {page !== 'login' && page !== 'register' && 
                <Redirect to="/login" />
            }
            <div className="login-overlay"> 
                <div className="flex-center login-window" >
                    <form onSubmit={handleOnSubmitLoginForm} className="flex-column">
                        <div className="login-message-region">{error}</div>
                        <input 
                            onChange={handleChangeEmail} 
                            value={email} 
                            className="login-textbox-email" 
                            type="text" 
                            placeholder="Login" 
                        />
                        <input 
                            onChange={handleChangePassword} 
                            value={password} 
                            className="login-textbox-password" 
                            type="password" 
                            placeholder="Password" 
                        />
                        <div className="login-region-submit">
                            <button className="login-submit-button">{getButtonText()}</button>
                            <Link className="login-link" to={getUrlLink()} >{getLinkText()}</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    error: state.authorization.error,
    isFetching: state.authorization.isFetching
});

const actionsCreators = {
    signIn,
    signUp
};

export default connect(mapStateToProps, actionsCreators)(LoginPage);