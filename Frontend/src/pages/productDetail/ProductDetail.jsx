import React, { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "src/components/navbar/Navbar";
import Announcement from "src/components/announcement/Announcement";
import Newsletter from "src/components/newsletter/Newsletter";
import Footer from "src/components/footer/Footer";
import './ProductDetail.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { publicRequest } from '../../requestMethod.js';
import { addProduct } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";
// import Preview from "src/components/preview/Preview";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholderImg from "src/assets/img/placeholder.png"
import Loading from 'src/components/loading/Loading'
import { useSelector } from 'react-redux';
import Delay from 'src/components/delay/Delay';
import Popup from "src/components/popup/Popup";

export default function ProductDetail() {
    const { isPublicFetching } = useSelector(state => state.publicAction)
    const Preview = lazy(() => import('src/components/preview/Preview'))
    const dispatch = useDispatch()
    const location = useLocation();
    const [color, setColor] = useState('color');
    const [size, setSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const [checked, setChecked] = useState(-1);
    const [mainImg, setMainImg] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0);
        const productId = location.pathname.split('/')[2];
        let getProduct = async () => {
            const res = await publicRequest.get(`/api/products/find/${productId}`);
            setProduct(res.data.product);
        }
        getProduct()
    }, [])

    function selectColor(color, index) {
        setColor(color);
        setChecked(index)
    }

    function handleAddProduct() {
        const { _id, title, description, img, categories, price } = product
        dispatch(addProduct({
            _id,
            title,
            description,
            img,
            categories,
            price,
            color,
            size,
            productQuantity: quantity
        }))
    }
    return (
        <div style={{ overflow: 'hidden' }}>
            <Delay showDelay={isPublicFetching} />
            <Navbar />
            <Announcement />
            <div className="productDetailContainer">
                <div className="imgContainer">
                    <LazyLoadImage src={mainImg ? mainImg : product.img ? product.img[0] : ''}
                        throttle={1000}
                        PlaceholderSrc={placeholderImg}
                        className='mainImg'
                        effect="blur"
                    />
                    <Suspense fallback={<Loading />}>
                        <Preview imgData={product.img ? product.img : []} setMainImg={setMainImg} />
                    </Suspense>
                </div>
                <div className="contentContainer">
                    <h1 className="title">{product.title}</h1>
                    <p className="description">{product.description}</p>
                    <span className="price">$ {product.price}</span>
                    <div className="choose">
                        <div className="color">
                            <span>Color:</span>
                            {product.color && product.color.length > 0 && product.color.map((item, index) => {
                                return (
                                    <div onClick={() => selectColor(item, index)}
                                        style={{
                                            backgroundColor: item,
                                            color: item === 'white' ? 'black' : 'white'
                                        }}>{index === checked ? <FontAwesomeIcon icon={faCheck} /> : <></>}</div>
                                )
                            })}

                        </div>
                        <div className="size">
                            <span>Size:</span>
                            <div className="expand">
                                <span className="selected">{size}<FontAwesomeIcon icon={faAngleDown} /></span>
                                <div className="sub">
                                    {product && product.size && product.size.length > 0 && product.size.map(item => {
                                        return <span onClick={() => setSize(item.toUpperCase())}>{item.toUpperCase()}</span>
                                    })}

                                </div>
                            </div>
                        </div>
                        <div className="quantity">
                            <span onClick={() => setQuantity(quantity === 1 ? 1 : quantity - 1)}>-</span>
                            <div>{quantity}</div>
                            <span onClick={() => setQuantity(quantity + 1)}>+</span>
                        </div>
                    </div>
                    <div className="button" onClick={() => handleAddProduct()}>
                        Add to cart
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
            <Popup />
        </div>
    )
}