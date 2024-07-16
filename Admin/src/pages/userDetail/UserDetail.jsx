import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar, faMobile, faEnvelope, faLocationDot, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import Edit from 'src/components/edit/Edit'
import { useSelector } from 'react-redux';

export default function UserDetail() {
    const navigate = useNavigate();
    const location = useLocation();

    const accountId = location.pathname.split('/')[2]
    const { accountList } = useSelector(state => state.account)
    const account = accountList.find(item => item._id === accountId)

    return (
        <Edit isEditUser={true}
            account={account} />
    )
}