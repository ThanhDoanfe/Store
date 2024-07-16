import React, { useEffect, useState } from 'react';
import './RegisterAndLogin.scss';
import { publicRequest } from '../../requestMethod';
import { login, register } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Popup from 'src/components/popup/Popup'
import { closePopup } from 'src/redux/popupRedux'
import Delay from 'src/components/delay/Delay'

export default function RegisterAndLogin(props) {
    const formData = new FormData();
    const dispatch = useDispatch()
    const { isFetching } = useSelector(state => state.user)
    const [exchange, setExchange] = useState(props.exchange);
    const [done, setDone] = useState(props.exchange);
    const [data, setData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        avatar: '',
        email: '',
        password: '',
    });


    function slide() {
        setExchange(!exchange);
        setTimeout(() => {
            setDone(!done);
        }, 500)
    }

    function onChangeInput(event, whichInput) {
        let copyState = { ...data };
        copyState[whichInput] = whichInput !== 'avatar' ? event.target.value : event.target.files[0];
        setData({
            ...copyState,
        });
    }

    async function submit(type) {
        switch (type) {
            case 'login':
                await login(dispatch, { userName: data.userName, password: data.password })
                break;
            case 'register':
                for (let item in data) {
                    formData.set(item, data[item])
                }
                await register(dispatch, formData)
                break;
        }
    }

    window.onbeforeunload = () => { dispatch(closePopup()) }

    return (
        <div className="bodyContainer">
            <Delay showDelay={isFetching} />
            <div className="form">
                <div className="left"
                    style={{ transform: exchange ? 'translateX(300px)' : '' }}>
                    <div className="circle">
                        <div className="one"></div>
                        <div className="two"></div>
                        <div className="three"></div>
                    </div>
                    <form>
                        <h1>{done ? 'Register' : 'Welcome'}</h1>
                        {done ?
                            <div className="registerInputs">
                                <div className="inputCol">
                                    <input type="email" placeholder="Email" autocomplete="off" onChange={(event) => onChangeInput(event, 'email')} />
                                    <input type='text' placeholder="User name" onChange={(event) => onChangeInput(event, 'userName')} />
                                    <input type="password" placeholder='Password' autocomplete="off" onChange={(event) => onChangeInput(event, 'password')} />
                                    <input type='text' placeholder="First name" onChange={(event) => onChangeInput(event, 'firstName')} />
                                </div>
                                <div className='inputCol'>
                                    <input type='text' placeholder="Last name" onChange={(event) => onChangeInput(event, 'lastName')} />
                                    <input type='text' placeholder="Phone number" onChange={(event) => onChangeInput(event, 'phoneNumber')} />
                                    <input type='text' placeholder="Address" onChange={(event) => onChangeInput(event, 'address')} />
                                    <label for="avatar" className="avatarLabel">
                                        <FontAwesomeIcon icon={faCloudArrowUp} />{data.avatar ? data.avatar.name : 'Choose an avatar'}
                                    </label>
                                    <input id='avatar' type='file'
                                        onChange={(event) => onChangeInput(event, 'avatar')} />
                                </div>
                            </div>
                            :
                            <>
                                <input type='text' placeholder="User name" onChange={(event) => onChangeInput(event, 'userName')} />
                                <input type="password" placeholder='Password' autocomplete="off" onChange={(event) => onChangeInput(event, 'password')} />
                            </>}
                        {done
                            ? <div className="button" onClick={() => submit('register')}>Sign up</div>
                            : <div className="button" onClick={() => submit('login')} disabled={isFetching}>Login</div>}
                    </form>
                </div>
                <div className="right"
                    style={{ transform: exchange ? 'translateX(-700px)' : '' }}>
                    {done ? <span>If you already has an account, just sign in.</span>
                        : <span>Don't have an account?<br />Please sign up!</span>}
                    <div className="button"
                        onClick={() => slide()}>{done ? 'Login' : 'Sign up'}</div>
                </div>
            </div>
            <Popup />
        </div>
    )
}