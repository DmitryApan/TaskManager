import React from 'react';
import {Avatar} from './Avatar';
import {TextEditor} from './TextEditor';
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
        })

        updateData({
            userInfo: {...response}
        })
    }  

    render() {
        const {name, avatar, password} = this.state;

        return(
            <div class="flex-column">
                <Avatar name={this.props.name} avatar={this.props.avatar} />
                <p>Name:</p>
                <TextEditor
                    text={name}
                    onChangeText={this.handleChange('name')}
                />
                <p>Avatar url:</p>
                <TextEditor
                    text={avatar}
                    onChangeText={this.handleChange('avatar')}
                />
                <p>Password</p>
                <TextEditor
                    text={password}
                    onChangeText={this.handleChange('password')}
                />
            </div>
        )
    }
}