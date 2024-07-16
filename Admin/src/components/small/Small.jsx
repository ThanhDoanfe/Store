import React, { useEffect, useState } from 'react';
import './Small.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { userRequest } from 'src/requestMethods';

export default function Small() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const getUsers = async () => {
            const res = await userRequest.get('/api/users/findAll?getNewest=true')
            setUsers(res.data.users)
        }
        getUsers();
    }, [])
    console.log('userrrrrrrr', users)
    return (
        <div className="smallContainer">
            <h2 className="title">New Join Members</h2>
            <div className="content">
                {users && users.length > 0 && users.map((item) => {
                    return (
                        <div className="row">
                            <div className="avatar"></div>
                            <div className="info">
                                <span className="name">{item.firstName} {item.lastName}</span>
                            </div>
                            <div className="btn">
                                <FontAwesomeIcon icon={faEye} className='icon' />
                                <span>Display</span>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}