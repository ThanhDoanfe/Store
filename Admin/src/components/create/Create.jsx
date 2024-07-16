import React, { useState } from 'react';
import './Create.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, addAccount } from 'src/redux/apiCalls';
import Preview from 'src/components/preview/Preview';
import CryptoJS from 'crypto-js';

export default function Create(props) {
    const formData = new FormData();
    const dispatch = new useDispatch();
    const { isFetching } = useSelector(state => state.product)

    const [newAccount, setNewAccount] = useState({
        userName: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        avatar: ''
    })

    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        img: '',
        price: 0,
        categories: [],
        size: [],
        color: [],
        inStock: true
    });

    function onChangeInput(event, whichInput) {
        if (props.isCreateUser) {
            const copyState = { ...newAccount }
            copyState[whichInput] = whichInput !== 'avatar' ? event.target.value : event.target.files[0]
            setNewAccount({
                ...copyState
            })
        } else {
            const copyState = { ...newProduct };
            copyState[whichInput] = whichInput !== 'img' ? event.target.value : event.target.files;
            setNewProduct({
                ...copyState
            });
        }
    }

    function changeSelect(whichState, whichSelect) {
        if (document.querySelector(`#${whichSelect}`).checked) {
            newProduct[whichState].push(whichSelect)
        } else {
            const index = newProduct[whichState].findIndex(item => item === whichSelect)
            newProduct[whichState].splice(index, 1)
        }
    }

    function addNewAccount() {
        for (let item in newAccount) {
            formData.set(item, newAccount[item])
        }
        addAccount(dispatch, formData)
    }

    function addNewProduct() {
        const { img, ...copyState } = newProduct
        for (let item in copyState) {
            if (Array.isArray(copyState[item])) {
                for (let i of copyState[item]) {
                    formData.append(item, i.toLowerCase());
                }
            }
            else
                formData.set(item, copyState[item])
        }
        for (let item of img) {
            formData.append('img', item)
        }
        addProduct(dispatch, formData)
        // for (const value of formData.values()) {
        //     console.log(value);
        // }
    }

    return (
        <div className="createContainer">
            <h2>{props.isCreateUser ? 'Add New User' : 'Add New Product'}</h2>
            <div className="content">
                <div className="left">
                    {props.isCreateUser ?
                        <>
                            <div className="form">
                                <span>Username</span>
                                <input type="text"
                                    onChange={(event) => onChangeInput(event, 'userName')} />
                            </div>
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
                                <span>Password</span>
                                <input type="password"
                                    onChange={(event) => onChangeInput(event, 'password')} />
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
                        </> :
                        <>
                            <div className="form">
                                <span>Product name</span>
                                <input type="text"
                                    onChange={(event) => onChangeInput(event, 'title')} />
                            </div>
                            <div className="form">
                                <span>Description</span>
                                <textarea type="text"
                                    onChange={(event) => onChangeInput(event, 'description')} />
                            </div>
                            <div className="form">
                                <span>Category</span>
                                <div className="selectDiv">
                                    <div className="row">
                                        <input type="checkbox" id="men" onChange={() => changeSelect("categories", "men")} />
                                        <label for="men">Men</label>
                                    </div>
                                    <div className="row">
                                        <input type="checkbox" id="women" onChange={() => changeSelect("categories", "women")} />
                                        <label for="women">Women</label>
                                    </div>
                                    <div className="row">
                                        <input type="checkbox" id="shirt" onChange={() => changeSelect("categories", "shirt")} />
                                        <label for="shirt">Shirt</label>
                                    </div>
                                    <div className="row">
                                        <input type="checkbox" id="pant" onChange={() => changeSelect("categories", "pant")} />
                                        <label for="pant">Pant</label>
                                    </div>
                                    <div className="row">
                                        <input type="checkbox" id="jacket" onChange={() => changeSelect("categories", "jacket")} />
                                        <label for="jacket">Jacket</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form">
                                <span>Size</span>
                                <div className="selectDiv">
                                    <div className="row">
                                        <input type="checkbox" id="s" onChange={() => changeSelect("size", "s")} />
                                        <label for="s">S</label>
                                    </div>
                                    <div className="row">
                                        <input type="checkbox" id="m" onChange={() => changeSelect("size", "m")} />
                                        <label for="m">M</label>
                                    </div>
                                    <div className="row">
                                        <input type="checkbox" id="l" onChange={() => changeSelect("size", "l")} />
                                        <label for="l">L</label>
                                    </div>
                                    <div className="row">
                                        <input type="checkbox" id="xl" onChange={() => changeSelect("size", "xl")} />
                                        <label for="xl">XL</label>
                                    </div>
                                    <div className="row">
                                        <input type="checkbox" id="xxl" onChange={() => changeSelect("size", "xxl")} />
                                        <label for="xxl">XXL</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form">
                                <span>Color</span>
                                <div className="selectDiv">
                                    <div className="row">
                                        <input type="checkbox" id="black" onChange={() => changeSelect("color", "black")} />
                                        <label for="black">Black</label>
                                    </div>
                                    <div className="row">
                                        <input type="checkbox" id="white" onChange={() => changeSelect("color", "white")} />
                                        <label for="white">White</label>
                                    </div>
                                    <div className="row">
                                        <input type="checkbox" id="red" onChange={() => changeSelect("color", "red")} />
                                        <label for="red">Red</label>
                                    </div>
                                    <div className="row">
                                        <input type="checkbox" id="blue" onChange={() => changeSelect("color", "blue")} />
                                        <label for="blue">Blue</label>
                                    </div>
                                    <div className="row">
                                        <input type="checkbox" id="yellow" onChange={() => changeSelect("color", "yellow")} />
                                        <label for="yellow">Yellow</label>
                                    </div>
                                    <div className="row">
                                        <input type="checkbox" id="green" onChange={() => changeSelect("color", "green")} />
                                        <label for="green">Green</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form">
                                <span>Price</span>
                                <input type="number"
                                    onChange={(event) => onChangeInput(event, 'price')} />
                            </div>
                            <div className="form">
                                <span>In stock</span>
                                <select id="inStock" name="inStock" onChange={(event) => onChangeInput(event, 'inStock')}>
                                    <option value={true} >Yes</option>
                                    <option value={false} >No</option>
                                </select>
                            </div>
                        </>
                    }

                </div>
                <div className="right">
                    {props.isCreateUser ?
                        <img width='150px' height='150px' src={newAccount.avatar ? URL.createObjectURL(newAccount.avatar) : ''} /> :
                        <Preview imgData={newProduct.img ? newProduct.img : []} />}
                    <div className="uploadImg">
                        {/* {props.isCreateUser ? <></> : 
                            <div className="previews">
                                
                            </div>
                        } */}
                        <label for="productImg" className="productImgLabel">
                            <FontAwesomeIcon icon={faCloudArrowUp} />{'Choose image'}
                        </label>
                        <input id='productImg' type='file' multiple={props.isCreateUser ? false : true}
                            onChange={(event) => onChangeInput(event, props.isCreateUser ? 'avatar' : 'img')}
                            style={{ display: 'none' }} />
                    </div>
                    <div className="update"
                        onClick={() => {
                            if (props.isCreateUser) addNewAccount()
                            else addNewProduct()
                        }}>Create</div>
                </div>
            </div>
        </div>
    )
}