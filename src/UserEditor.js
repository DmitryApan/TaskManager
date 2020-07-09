import React from 'react';
import {Avatar} from './Avatar';
import {TextEditor} from './components/TextEditor/TextEditor';
import {userInfo} from './networkFunctions';

export class UserEditor extends React.Component {
    constructor(props) {
        super(props);

        let {name, avatar, password} = this.props;

        this.state = {
            name,
            avatar,
            password,
        }
    }

    handleChange = (key) => async(text) => {
        let {email, updateData} = this.props;

        let response = await userInfo({
            email,
            [key]: text
        });

        updateData({
            userInfo: {...response}
        });
    }

    render() {
        const {name, avatar, password} = this.state;
        
        return(
            <div class="flex-column">
                <Avatar 
                    {...this.props}
                    key={this.props.avatar} 
                />
                <p>Name:</p>
                <TextEditor
                    placeholder={'Name'}
                    text={name}
                    onChangeText={this.handleChange('name')}
                />
                <p>Avatar url:</p>
                <TextEditor
                    placeholder={'https://...'}
                    text={avatar}
                    onChangeText={this.handleChange('avatar')}
                />
                <p>Password</p>
                <TextEditor
                    asterisk                    
                    text={password}
                    onChangeText={this.handleChange('password')}
                />
            </div>
        )
    }
}