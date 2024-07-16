import React, { useRef } from 'react';
import './MobileRegister.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup, displayPopup } from 'src/redux/popupRedux'
import Popup from 'src/components/popup/Popup'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { publicRequest } from 'src/requestMethod';
import { useNavigate } from 'react-router';
import Delay from 'src/components/delay/Delay'

export default function MobileRegister() {
    window.onbeforeunload = () => { dispatch(closePopup()) }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isFetching } = useSelector(state => state.user)
    const inputData = useRef({
        userName: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        avatar: '',
        email: '',
        password: '',
    })
    const formData = new FormData()

    function handleChangeInput(e, whichInput) {
        inputData.current[whichInput] = whichInput !== 'avatar' ? e.target.value : e.target.files[0]
    }

    async function handleRegister() {
        for (const key in inputData.current) {
            formData.set(key, inputData.current[key])
        }
        const res = await publicRequest.post('/api/auth/register', formData)
        if (res.data) dispatch(displayPopup())
    }

    return (
        <div className="mobileRegisterContainer">
            <Delay showDelay={isFetching} />
            <div className="circles">
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="four"></div>
            </div>
            <div className="registerForm">
                <h1 className="title">Create your account</h1>
                <div className="form">
                    <div className="row">
                        <input type="email" placeholder="Email" autocomplete="off" onChange={(e) => handleChangeInput(e, 'email')} />
                    </div>
                    <div className="row">
                        <input type='text' placeholder='User name' onChange={(e) => handleChangeInput(e, 'userName')} />
                    </div>
                    <div className="row">
                        <input type='password' placeholder='Password' onChange={(e) => handleChangeInput(e, 'password')} />
                    </div>
                    <div className="row">
                        <input type='text' placeholder="First name" onChange={(e) => handleChangeInput(e, 'firstName')} />
                    </div>
                    <div className="row">
                        <input type='text' placeholder="Last name" onChange={(e) => handleChangeInput(e, 'lastName')} />
                    </div>
                    <div className="row">
                        <input type='text' placeholder="Phone number" onChange={(e) => handleChangeInput(e, 'phoneNumber')} />
                    </div>
                    <div className="row">
                        <input type='text' placeholder="Address" onChange={(e) => handleChangeInput(e, 'address')} />
                    </div>
                    <div className="row">
                        <label for="avatar" className="avatarLabel">
                            <FontAwesomeIcon icon={faCloudArrowUp} />{inputData.current.avatar ? inputData.current.avatar.name : 'Choose an avatar'}
                        </label>
                        <input id='avatar' type='file' style={{ display: 'none' }}
                            onChange={(e) => handleChangeInput(e, 'avatar')} />
                    </div>
                    <div className="row">
                        <span className='login' onClick={() => navigate('/mobile/login')}>Already have an account? Log in!</span>
                    </div>
                </div>
                <div className='button' onClick={handleRegister}>Sign up</div>
            </div>
            <Popup />
        </div>
    )
}