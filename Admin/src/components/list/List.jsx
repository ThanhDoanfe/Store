import React, { useEffect, useState } from "react";
import './List.scss';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { deleteProduct, deleteAccount } from 'src/redux/apiCalls';
import { useDispatch } from "react-redux";
import { userRequest } from 'src/requestMethods';

export default function List(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        {
            field: props.isUserList ? 'userName' : 'name',
            headerName: props.isUserList ? 'User' : 'Product',
            width: 280,
            renderCell: (params) => {
                return (
                    <div className="info">
                        <div className={props.isUserList ? 'avatar' : 'productImg'}
                            style={{
                                background: `url('${props.isUserList ? params.row.avatar : params.row.img[0]}') center center no-repeat`,
                                backgroundSize: 'cover'
                            }}></div>
                        <span>{props.isUserList ? params.row.userName : params.row.title}</span>
                    </div>
                )
            }
        },
        {
            field: props.isUserList ? 'email' : 'inStock',
            headerName: props.isUserList ? 'Email' : 'Stock',
            width: 200
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="status">
                        <FontAwesomeIcon icon={faCircleDot} className={params.row.status} />
                        <span>{params.row.status}</span>
                    </div>
                )
            }
        },
        {
            field: props.isUserList ? 'transaction' : 'price',
            headerName: props.isUserList ? 'Transaction' : 'Price',
            width: 200,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => {
                return (
                    <div className="action">
                        <FontAwesomeIcon icon={faPenToSquare} className="edit"
                            onClick={() => navigate(`/${props.isUserList ? 'user' : 'product'}/${params.row._id}`)} />
                        <FontAwesomeIcon icon={faTrash} className="delete"
                            onClick={() => {
                                if (props.isUserList) deleteAccount(dispatch, params.row._id)
                                else deleteProduct(dispatch, params.row._id)
                            }} />
                    </div>
                )
            }
        },
    ];

    // const setNextPage = async (pathId) => {
    //     switch(props.isUserList) {
    //         case true:
    //             break;
    //         case false:
    //             const res = await userRequest.get(`/api/products/find/${pathId}`)
    //             navigate(`/product/${pathId}`)
    //     }
    // }

    return (
        <div className="listContainer">
            <div className="header">
                <h2>{props.isUserList ? 'Users List' : 'Products List'}</h2>
                <div className="create"
                    onClick={() => navigate(props.isUserList ? '/addUser' : '/addProduct')}>Create</div>
            </div>
            <DataGrid
                rows={props.data ? props.data : []}
                disableRowSelectionOnClick
                columns={columns}
                rowHeight={68}
                className="grid"
                getRowId={(row) => row._id}
            />
        </div>
    )
}