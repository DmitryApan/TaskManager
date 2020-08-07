import React from 'react';

import {Link} from 'react-router-dom';

export default function LoginPage({buttonText, linkText, linkUrl, message, onSubmitLoginForm, onChangeLoginInput}) {
    return (
        <div class="login-overlay"> 
            <div class="flex-center login-window" >
                <form onSubmit={onSubmitLoginForm} class="flex-column">
                    {message && <div class="login-message-region">{message}</div>}
                    <input onChange={onChangeLoginInput} class="login-textbox-email" type="text" name="userEmail" placeholder="Login" />
                    <input onChange={onChangeLoginInput} class="login-textbox-password" type="password" name="userPassword" placeholder="Password" />
                    <div class="login-region-submit">
                        <button class="login-submit-button" name={buttonText}>{buttonText}</button>
                        <Link class="login-link" to={linkUrl} >{linkText}</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}