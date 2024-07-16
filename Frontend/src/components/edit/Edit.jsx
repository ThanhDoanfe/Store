import React, { useState } from "react";
import './Edit.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar, faMobile, faEnvelope, faLocationDot, faUpload } from "@fortawesome/free-solid-svg-icons";
import placeholderImg from "src/assets/img/placeholder.png";
import { editProfile } from "src/redux/apiCalls";
import { useDispatch } from "react-redux";

export default function Edit(props) {
    const currentUser = props.currentUser
    const formData = new FormData();
    const dispatch = useDispatch()

    const [editedData, setEditedData] = useState({
        password: currentUser.password,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        address: currentUser.address,
        phoneNumber: currentUser.phoneNumber,
    })
    const [avatar, setAvatar] = useState('')

    function onChangeInput(event, whichInput) {
        const copyState = { ...editedData }
        copyState[whichInput] = event.target.value
        setEditedData({
            ...copyState
        })
    }

    function createUpdateData() {
        if (avatar) formData.set('avatar', avatar)
        for (let key in editedData) {
            formData.set(key, editedData[key])
        }
        editProfile(dispatch, currentUser._id, formData)
    }

    return (
        <div className="editContainer">
            <div className="content">
                <div className="leftContent">
                    <div className="info">
                        <div className="avatar"
                            style={{
                                background: `url('${currentUser.avatar}') center center no-repeat`,
                                backgroundSize: 'cover'
                            }}></div>
                        <div className="name">
                            <span>{currentUser.firstName} {currentUser.lastName}</span>
                            <span>{currentUser.email}</span>
                        </div>
                    </div>

                    <div className="block">
                        <span className='title'>Account Details</span>
                        <div className='row'>
                            <FontAwesomeIcon icon={faUser} className='icon' />
                            <span>{currentUser.userName}</span>
                        </div>
                        <div className='row'>
                            <FontAwesomeIcon icon={faCalendar} className='icon' />
                            <span>01.02.2001</span>
                        </div>
                    </div>
                    <div className="block">
                        <span className='title'>Contact</span>
                        <div className='row'>
                            <FontAwesomeIcon icon={faMobile} className='icon' />
                            <span>{currentUser.phoneNumber}</span>
                        </div>
                        <div className='row'>
                            <FontAwesomeIcon icon={faEnvelope} className='icon' />
                            <span>{currentUser.email}</span>
                        </div>
                        <div className='row'>
                            <FontAwesomeIcon icon={faLocationDot} className='icon' />
                            <span>{currentUser.address}</span>
                        </div>
                    </div>
                </div>

                <div className="rightContent">
                    <h2>Edit your profile</h2>
                    <div className="content">
                        <div className="left">
                            <div className="form">
                                <span>First name</span>
                                <input type="text"
                                    onChange={(event) => onChangeInput(event, 'firstName')} />
                            </div>
                            <div className="form">
                                <span>Last name</span>
                                <input type="text"
                                    onChange={(event) => onChangeInput(event, 'lastName')} />
                            </div>
                            <div className="form">
                                <span>Email</span>
                                <input type="text"
                                    onChange={(event) => onChangeInput(event, 'email')} />
                            </div>
                            <div className="form">
                                <span>Phone number</span>
                                <input type="text"
                                    onChange={(event) => onChangeInput(event, 'phoneNumber')} />
                            </div>
                            <div className="form">
                                <span>Address</span>
                                <input type="text"
                                    onChange={(event) => onChangeInput(event, 'address')} />
                            </div>
                            <div className="form">
                                <span>Password</span>
                                <input type="password" id="password" autocomplete="off"
                                    onChange={(event) => onChangeInput(event, 'password')} />
                            </div>
                        </div>
                        <div className="right">
                            <div className="uploadImg">
                                <img width='100%' height='100px'
                                    src={avatar ? URL.createObjectURL(avatar) : currentUser.avatar ? currentUser.avatar : placeholderImg} />
                                <label for='productImg'><FontAwesomeIcon icon={faUpload} className='iconUpload' /></label>
                                <input type="file" name="" id='productImg'
                                    onChange={(event) => setAvatar(event.target.files[0])} />
                            </div>
                            <div className="update"
                                onClick={() => createUpdateData()}>Update</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}