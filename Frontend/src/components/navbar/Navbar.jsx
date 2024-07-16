import React, { useState, useRef, useEffect } from 'react';
import './Navbar.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass, faTree, faCartShopping,
    faUser, faSignOut, faCaretRight, faReceipt
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from 'src/redux/userRedux';
import { productArray2 } from 'src/data';
import { publicRequest } from 'src/requestMethod';
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholderImg from "src/assets/img/placeholder.png"
import { searchProduct } from 'src/redux/apiCalls'
import useDebounce from 'src/hooks/useDebounce';
import Dialog from 'src/components/dialog/Dialog'

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function navigation(whichPage) {
        navigate(`/${whichPage}`)
    }
    const cart = useSelector(state => state.cart)
    const { currentUser } = useSelector(state => state.user)
    const { isSearching } = useSelector(state => state.publicAction)
    const [isDrop, setIsDrop] = useState(false)

    const [search, setSearch] = useState('')
    const debounceSearch = useDebounce(search)
    const [searchedProducts, setSearchedProducts] = useState([])

    const isMobileDevice = window.matchMedia("(max-width: 768px)").matches
    const [openDialog, setOpenDialog] = useState(false)

    useEffect(() => {
        async function startSearch() {
            const result = await searchProduct(dispatch, debounceSearch)
            setSearchedProducts(result)

            return () => {
                setSearch('')
            }
        }
        startSearch()
    }, [debounceSearch])

    function handleLogout() {
        setOpenDialog(true)
    }

    function confirmLogout() {
        setOpenDialog(false)
        navigation('home')
        dispatch(logout())
    }

    function closeDialog() {
        setOpenDialog(false)
    }

    return (
        <div className='navbarContainer' >
            <Dialog openDialog={openDialog} closeDialog={closeDialog} confirm={confirmLogout} />
            <div className='left containerChild'>
                <div className='badge' onClick={() => navigation('cart')}>
                    <FontAwesomeIcon icon={faCartShopping} className='icon' />
                    {cart.cartQuantity > 0 ? <span>{cart.cartQuantity}</span> : <></>}
                </div>
                {currentUser ?
                    <>
                        <div className='avatar'
                            style={{
                                background: `url('${currentUser.avatar}') center center no-repeat`,
                                backgroundSize: 'cover'
                            }}
                            onClick={() => setIsDrop(!isDrop)}>
                            <div className='dropdown' style={{ display: isDrop ? 'flex' : 'none' }}>
                                <div className='header'>
                                    <div className='dropAvatar'
                                        style={{
                                            background: `url('${currentUser.avatar}') center center no-repeat`,
                                            backgroundSize: 'cover'
                                        }}></div>
                                    <div className='info'>
                                        <span className='name'>{currentUser.firstName} {currentUser.lastName}</span>
                                        <span className='email'>{currentUser.email}@gmail.com</span>
                                    </div>
                                </div>
                                <div className='row' onClick={() => navigation('userDetail')}>
                                    <div className='leftIcon'>
                                        <FontAwesomeIcon icon={faUser} className='icon' />
                                        <span>Edit Profile</span>
                                    </div>
                                    <FontAwesomeIcon icon={faCaretRight} className='rightIcon' />
                                </div>
                                {/* <div className='row' onClick={() => navigation('order')}>
                                    <div className='leftIcon'>
                                        <FontAwesomeIcon icon={faReceipt} className='icon' />
                                        <span>My Orders</span>
                                    </div>
                                    <FontAwesomeIcon icon={faCaretRight} className='rightIcon' />
                                </div> */}
                                <div className='row' onClick={() => handleLogout()}>
                                    <div className='leftIcon'>
                                        <FontAwesomeIcon icon={faSignOut} className='icon' />
                                        <span>Log out</span>
                                    </div>
                                    <FontAwesomeIcon icon={faCaretRight} className='rightIcon' />
                                </div>
                            </div>
                        </div>
                        <span className="userName">Hello, {currentUser.lastName}!</span>
                    </> :
                    <>
                        <span className='register' onClick={() => navigation('register')}>Register</span>
                        <span className='signin' onClick={() => navigation(isMobileDevice ? 'mobile/login' : 'login')}>Sign in</span>
                    </>
                }


            </div>
            <div className='center containerChild'>
                <h1 onClick={() => navigation('home')}>rêu. <FontAwesomeIcon icon={faTree} className='icon' /></h1>
            </div>
            <div className='right containerChild'>
                <div className='searchBar'>
                    <input type='text' autocomplete="asdasdasdas"
                        onChange={(event) => setSearch(event.target.value)} />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' />
                    <div className='searchResult'
                        style={{ display: debounceSearch ? 'flex' : 'none' }}>
                        {/* {productArray2 && productArray2.length > 0 && productArray2.map(item => {
                            if (item.title.toLowerCase().includes(search)) {
                                return (
                                    <div className='row'>
                                        <div className='productImg'
                                            style={{
                                                background: `url('${item.img}') center center no-repeat`,
                                                backgroundSize: 'cover'
                                            }}></div>
                                        <div className='info'>
                                            <span>{item.title}</span>
                                            <span>$20</span>
                                        </div>
                                    </div>
                                )
                            }
                        })} */}
                        <div className="row" style={{
                            width: '100%', height: '100px',
                            display: isSearching ? 'block' : 'none', overflowY: 'hidden'
                        }}>
                            <h1>Loading...</h1>
                        </div>
                        {searchedProducts && searchedProducts.length > 0 && searchedProducts.map(item => {
                            return (
                                <div className='row' onClick={() => navigate(`/product/${item._id}`)}>
                                    <div className='productImg'>
                                        <LazyLoadImage src={`${item.img[0]}`}
                                            throttle={1000}
                                            PlaceholderSrc={placeholderImg}
                                            className='lazyImg'
                                            effect="blur"
                                        />
                                    </div>
                                    <div className='info'>
                                        <span>{item.title}</span>
                                        <span>${item.price}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='languages'>
                    <span>EN</span>
                </div>
            </div>
        </div>
    )
}
