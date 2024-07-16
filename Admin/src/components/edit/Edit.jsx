import React, { useState } from 'react';
import './Edit.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar, faMobile, faEnvelope, faLocationDot, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Chart from 'src/components/chart/Chart';
import { useSelector, useDispatch } from 'react-redux';
import { editProduct, editAccount } from 'src/redux/apiCalls';
import Preview from 'src/components/preview/Preview';

export default function Edit(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formData = new FormData()

    const account = props.account
    const [editedAccount, setEditedAccount] = useState(props.isEditUser ? {
        userName: account.userName,
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName,
        address: account.address,
        phoneNumber: account.phoneNumber,
    } : {})
    const [userAvatar, setUserAvatar] = useState('')

    const product = props.product
    const [editedProduct, setEditedProduct] = useState(!props.isEditUser ? {
        title: product.title,
        description: product.description,
        price: product.price,
        inStock: product.inStock,
    } : {});
    const [imgArr, setImgArr] = useState([])

    function onChangeInput(event, whichInput) {
        const copyState = props.isEditUser ? { ...editedAccount } : { ...editedProduct }
        copyState[whichInput] = event.target.value

        if (props.isEditUser) {
            setEditedAccount({
                ...copyState
            })
        } else {
            setEditedProduct({
                ...copyState
            })
        }
    }

    function setImage(event) {
        if (props.isEditUser) {
            setUserAvatar(event.target.files[0])
        } else {
            setImgArr(event.target.files)
        }
    }

    function createUpdateData() {
        if (props.isEditUser) {
            if (userAvatar) formData.set('avatar', userAvatar)
            for (let key in editedAccount) {
                formData.set(key, editedAccount[key])
            }
            editAccount(dispatch, account._id, formData)
        } else {
            if (imgArr && imgArr.length > 0) {
                for (let img of imgArr) {
                    formData.append('img', img)
                }
            }
            for (let key in editedProduct) {
                formData.set(key, editedProduct[key])
            }
            editProduct(dispatch, product._id, formData)
        }
    }

    return (
        <div className="editContainer">
            <div className="header">
                <h2>{props.isEditUser ? 'Edit User' : 'Edit Product'}</h2>
                <div className="create" onClick={() => navigate(props.isEditUser ? '/addUser' : '/addProduct')}>Create</div>
            </div>
            <div className="content">
                <div className="leftContent">
                    <div className="info">
                        {props.isEditUser ?
                            <>
                                <div className="avatar"
                                    style={{
                                        background: `url('${account.avatar}') center center no-repeat`,
                                        backgroundSize: 'cover'
                                    }}></div>
                                <div className="name">
                                    <span>{account.firstName} {account.lastName}</span>
                                    <span>{account.email}</span>
                                </div>
                            </> :
                            <>
                                <div className="productImg"
                                    style={{
                                        background: `url('${product.img[0]}') center center no-repeat`,
                                        backgroundSize: 'cover'
                                    }}></div>
                                <span className="productName">{product.title}</span>
                            </>}
                    </div>

                    {props.isEditUser ?
                        <>
                            <div className="block">
                                <span className='title'>Account Details</span>
                                <div className='row'>
                                    <FontAwesomeIcon icon={faUser} className='icon' />
                                    <span>{account.userName}</span>
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
                                    <span>{account.phoneNumber}</span>
                                </div>
                                <div className='row'>
                                    <FontAwesomeIcon icon={faEnvelope} className='icon' />
                                    <span>{account.email}</span>
                                </div>
                                <div className='row'>
                                    <FontAwesomeIcon icon={faLocationDot} className='icon' />
                                    <span>{account.address}</span>
                                </div>
                            </div>
                        </> :
                        <div className='details'>
                            <div className='row'>
                                <span>Id: </span>
                                <span>{product._id}</span>
                            </div>
                            <div className='row'>
                                <span>Description: </span>
                                <span>{product.description}</span>
                            </div>
                            <div className='row'>
                                <span>Price: </span>
                                <span>{product.price}</span>
                            </div>
                            <div className='row'>
                                <span>In stock: </span>
                                <span>{product.inStock ? 'Yes' : 'No'}</span>
                            </div>
                        </div>}
                </div>

                <div className="rightContent">
                    <h2>Edit</h2>
                    <div className="content">
                        <div className="left">
                            {props.isEditUser ?
                                <>
                                    <div className="form">
                                        <span>Username</span>
                                        <input type="text" defaultValue={account.userName}
                                            onChange={(event) => onChangeInput(event, 'userName')} />
                                    </div>
                                    <div className="form">
                                        <span>First name</span>
                                        <input type="text" defaultValue={account.firstName}
                                            onChange={(event) => onChangeInput(event, 'firstName')} />
                                    </div>
                                    <div className="form">
                                        <span>Last name</span>
                                        <input type="text" defaultValue={account.lastName}
                                            onChange={(event) => onChangeInput(event, 'lastName')} />
                                    </div>
                                    <div className="form">
                                        <span>Email</span>
                                        <input type="text" defaultValue={account.email}
                                            onChange={(event) => onChangeInput(event, 'email')} />
                                    </div>
                                    <div className="form">
                                        <span>Phone number</span>
                                        <input type="text" defaultValue={account.phoneNumber}
                                            onChange={(event) => onChangeInput(event, 'phoneNumber')} />
                                    </div>
                                    <div className="form">
                                        <span>Address</span>
                                        <input type="text" defaultValue={account.address}
                                            onChange={(event) => onChangeInput(event, 'address')} />
                                    </div>
                                </> :
                                <>
                                    <div className="form">
                                        <span>Product name</span>
                                        <input type="text"
                                            defaultValue={product.title}
                                            onChange={(event) => onChangeInput(event, 'title')} />
                                    </div>
                                    <div className="form">
                                        <span>Description</span>
                                        <textarea type="text"
                                            defaultValue={product.description}
                                            onChange={(event) => onChangeInput(event, 'description')} />
                                    </div>
                                    <div className="form">
                                        <span>Price</span>
                                        <input type="number"
                                            defaultValue={product.price}
                                            onChange={(event) => onChangeInput(event, 'price')} />
                                    </div>
                                    <div className="form">
                                        <span>In stock</span>
                                        <select id="stock" name="stock" onChange={(event) => onChangeInput(event, 'inStock')}>
                                            <option value={true}>Yes</option>
                                            <option value={false}>No</option>
                                        </select>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="right">
                            <div className="uploadImg">
                                {/* <img src='https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
                                    alt='Upload your image here' /> */}
                                {props.isEditUser ?
                                    <img width='100%' height='100px' src={userAvatar ? URL.createObjectURL(userAvatar) : account.avatar} /> :
                                    <Preview imgData={imgArr.length > 0 ? imgArr : product.img} />}
                                <label for='productImg'><FontAwesomeIcon icon={faUpload} className='iconUpload' /></label>
                                <input type="file" name="" id='productImg' multiple={props.isEditUser ? false : true}
                                    onChange={(event) => setImage(event)} />
                            </div>
                            <div className="update"
                                onClick={() => createUpdateData()}>Update</div>
                        </div>
                    </div>
                </div>
            </div>
            {props.isEditUser ? <></> : <Chart data={props.productData} dataKey={props.dataKey} title={props.dataTitle} />}
        </div>
    )
}