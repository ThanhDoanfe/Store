import React from 'react';
import './Sidebar.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse, faUsers, faStore, faList, faMoneyBill, faShieldHalved, faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'src/redux/userRedux';
import { clearProduct } from 'src/redux/productRedux';

export default function Sidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    function Navigation(whichPage) {
        navigate(`/${whichPage}`)
    }
    function clearLocalStorage() {
        dispatch(clearProduct())
        dispatch(logout())
        Navigation('login')
    }
    return (
        <div className="sidebarContainer">
            <div className="row" onClick={() => Navigation('home')}>
                <FontAwesomeIcon icon={faHouse} className='icon' />
                <span>Home</span>
            </div>
            <div className="row" onClick={() => Navigation('users')}>
                <FontAwesomeIcon icon={faUsers} className='icon' />
                <span>Users</span>
            </div>
            <div className="row" onClick={() => Navigation('products')}>
                <FontAwesomeIcon icon={faStore} className='icon' />
                <span>Products</span>
            </div>
            <div className="row">
                <FontAwesomeIcon icon={faList} className='icon' />
                <span>Categories</span>
            </div>
            <div className="row">
                <FontAwesomeIcon icon={faMoneyBill} className='icon' />
                <span>Orders</span>
            </div>
            <div className="row">
                <FontAwesomeIcon icon={faShieldHalved} className='icon' />
                <span>Admins</span>
            </div>
            <div className="row">
                <FontAwesomeIcon icon={faPowerOff} className='icon' />
                <span onClick={() => clearLocalStorage()}>Log out</span>
            </div>
        </div>
    )
}