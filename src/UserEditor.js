import React from 'react';
import {connect} from 'react-redux';
import {
    changeUserInfoAvatar, 
    changeUserInfoName, 
    changeUserInfoPassword
} from './store/actionsCreators/userInfo';
import AreaAvatar from './components/AreaAvatar/AreaAvatar';
import TextEditor from './components/TextEditor/TextEditor';

import './App.css';

class UserEditor extends React.Component {
    
    render() {
        const {changeUserInfoAvatar, changeUserInfoName, changeUserInfoPassword, userInfo} = this.props;
        const {_id, name, avatar, password} = userInfo;
        
        return(
            <div class="flex-column">
                <div class="flex-center">
                    <div class="user-avatar">
                        <AreaAvatar 
                            id={_id} 
                            name={name}
                            avatar={avatar} 
                        />
                    </div>
                </div>            
                <p>Name:</p>
                <TextEditor
                    placeholder="Name"
                    text={name}
                    onChangeText={changeUserInfoName}
                />
                <p>Avatar url:</p>
                <TextEditor
                    placeholder="https://..."
                    text={avatar}
                    onChangeText={changeUserInfoAvatar}
                />
                <p>Password</p>
                <TextEditor
                    asterisk                    
                    text={password}
                    onChangeText={changeUserInfoPassword}
                />
            </div>
        )
    }
}

const actionsCreators = {
    changeUserInfoAvatar,
    changeUserInfoName,
    changeUserInfoPassword
};

const mapStateToProps = state => ({
    userInfo: state.userInfo.data
});

export default connect(mapStateToProps, actionsCreators)(UserEditor);