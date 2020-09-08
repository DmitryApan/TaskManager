import React, {useCallback, useState} from 'react';
import {Link, useParams, Redirect} from 'react-router-dom';
import {signIn, signUp} from './store/actionsCreators/authorization';
import {bindActionCreators} from 'redux';
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
            <div class="login-overlay"> 
                <div class="flex-center login-window" >
                    <form onSubmit={handleOnSubmitLoginForm} class="flex-column">
                        <div class="login-message-region">{error}</div>
                        <input 
                            onChange={handleChangeEmail} 
                            value={email} 
                            class="login-textbox-email" 
                            type="text" 
                            placeholder="Login" 
                        />
                        <input 
                            onChange={handleChangePassword} 
                            value={password} 
                            class="login-textbox-password" 
                            type="password" 
                            placeholder="Password" 
                        />
                        <div class="login-region-submit">
                            <button class="login-submit-button">{getButtonText()}</button>
                            <Link class="login-link" to={getUrlLink()} >{getLinkText()}</Link>
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

const mapDispatchToProps = dispatch => ({
    signIn: bindActionCreators(signIn, dispatch),
    signUp: bindActionCreators(signUp, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);