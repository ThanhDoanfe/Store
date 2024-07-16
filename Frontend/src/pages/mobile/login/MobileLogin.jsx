import React, { useRef } from 'react';
import './MobileLogin.scss';
import { login } from 'src/redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from 'src/redux/popupRedux'
import Popup from 'src/components/popup/Popup'
import { useNavigate } from 'react-router';
import Delay from 'src/components/delay/Delay'

export default function MobileLogin() {
    window.onbeforeunload = () => { dispatch(closePopup()) }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isFetching } = useSelector(state => state.user)
    const inputData = useRef({
        userName: '',
        password: '',
    })

    function handleChangeInput(e, whichInput) {
        inputData.current[whichInput] = e.target.value
    }

    async function handleLogin() {
        await login(dispatch, { userName: inputData.current.userName, password: inputData.current.password })
    }

    return (
        <div className="mobileLoginContainer">
            <Delay showDelay={isFetching} />
            <div className="circles">
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="four"></div>
            </div>
            <div className="loginForm">
                <h1 className="title">Welcome!</h1>
                <div className="form">
                    <div className="row">
                        <input type='text' placeholder='User name' onChange={(e) => handleChangeInput(e, 'userName')} />
                    </div>
                    <div className="row">
                        <input type='password' placeholder='Password' onChange={(e) => handleChangeInput(e, 'password')} />
                    </div>
                    <div className="row">
                        <span onClick={() => navigate('/mobile/register')}>Don't have an account? Sign up!</span>
                    </div>
                </div>
                <div className='button' onClick={handleLogin}>Login</div>
            </div>
            <Popup />
        </div>
    )
}