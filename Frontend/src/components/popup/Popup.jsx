import React, { useState } from 'react';
import './Popup.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { closePopup } from 'src/redux/popupRedux'
import { useDispatch, useSelector } from 'react-redux';

export default function Popup() {
    const dispatch = useDispatch()
    const { showPopup, typeSuccess, message } = useSelector(state => state.popup)
    const popupWidth = document.querySelector('.popupContainer')?.offsetWidth
    // function closePopup() {
    //     document.querySelector('.popupContainer')
    //         .style.transform = 'translateX(-432px)' 
    // }
    return (
        <div className="popupContainer"
            style={{
                backgroundColor: typeSuccess ? 'rgb(85, 214, 85)' : 'rgb(253, 83, 83)',
                transform: showPopup ? `translateX(${popupWidth + 32}px)` : ''
            }}>
            <FontAwesomeIcon icon={typeSuccess ? faCircleCheck : faExclamationTriangle} className='icon' />
            <span>
                {message}
            </span>
            <FontAwesomeIcon icon={faTimes} className='icon x'
                onClick={() => dispatch(closePopup())} />
        </div>
    )
}