import React, { useState, useEffect } from 'react';
import './Login.scss';
import { login } from 'src/redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
    const dispatch = useDispatch();
    const { isFetching } = useSelector(state => state.user)
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="loginContainer">
            <h2>Admin Login</h2>
            <div className="form">
                <span>User name</span>
                <input type="text" onChange={(event) => setUserName(event.target.value)}></input>
            </div>
            <div className="form">
                <span>Password</span>
                <input type="password" onChange={(event) => setPassword(event.target.value)}></input>
            </div>
            <div className="btn" onClick={() => login(dispatch, { userName, password })} disabled={isFetching}>Login</div>
        </div>
    )
}