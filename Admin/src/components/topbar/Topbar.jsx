import React from 'react';
import './Topbar.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faGlobe, faGear } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';

export default function Topbar() {
    const { currentUser } = useSelector(state => state.user)
    return (
        <div className="topbarContainer">
            <h2 className="left">Admin Dashboard</h2>
            <div className="right">
                <div className="badge">
                    <FontAwesomeIcon icon={faBell} className='icon' />
                    <span>3</span>
                </div>

                <div className="badge">
                    <FontAwesomeIcon icon={faGlobe} className='icon' />
                    <span>3</span>
                </div>
                <div className="badge">
                    <FontAwesomeIcon icon={faGear} className='icon' />
                </div>
                <div className="avatar"
                    style={{
                        background: `url('${currentUser.avatar}') center center no-repeat`,
                        backgroundSize: 'cover'
                    }}></div>
            </div>
        </div>
    )
}