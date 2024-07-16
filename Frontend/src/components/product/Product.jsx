import React, { useEffect } from "react";
import './Product.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { addProduct } from '../../redux/cartRedux';
import { useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholderImg from "src/assets/img/placeholder.png"

export default function Product(props) {
    const navigate = useNavigate();
    function navigation(whichPage) {
        navigate(`/${whichPage}`)
    }
    const dispatch = useDispatch()
    function handleAddProduct() {
        const { _id, title, description, img, categories, price, color, size } = props.product
        dispatch(addProduct({
            _id,
            title,
            description,
            img,
            categories,
            price,
            color: color[0],
            size: size[0],
            productQuantity: 1
        }))
    }
    return (
        <div className="productContainer">
            <div className="circle"></div>
            {/* <img src={`${props.itemImg}`} /> */}
            <LazyLoadImage src={`${props.itemImg}`}
                throttle={1000}
                width={280} height={280}
                PlaceholderSrc={placeholderImg}
            // effect="blur"
            />
            <div className="icons">
                <div className='icon' ><FontAwesomeIcon icon={faCartShopping}
                    onClick={() => handleAddProduct()} /></div>
                <div className='icon' onClick={() => navigation(`product/${props.itemId}`)}><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                <div className='icon' ><FontAwesomeIcon icon={faHeart} /></div>
            </div>
        </div>
    )
}