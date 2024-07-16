import React, { useRef, useState } from 'react';
import './Newsletter.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { getNewsletter } from 'src/redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux';
import Delay from 'src/components/delay/Delay'
import Popup from 'src/components/popup/Popup'
import { closePopup } from 'src/redux/popupRedux'

export default function Newsletter() {
    const dispatch = useDispatch()
    window.onbeforeunload = () => { dispatch(closePopup()) }
    const emailAddress = useRef('')

    function onChangeEmail(e) {
        emailAddress.current = e.target.value
    }

    async function sendMail() {
        await getNewsletter(dispatch, emailAddress.current)
    }

    return (
        <div className="newsletterContainer">
            <h1>Newsletter</h1>
            <span>Get timely updates from your favorite products</span>
            <div className="email">
                <input type='email' placeholder='Your email' pattern=".+@gmail\.com" size="30" required
                    onChange={(e) => onChangeEmail(e)} />
                <div className="icon" onClick={sendMail}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>
            </div>
        </div>
    )
}