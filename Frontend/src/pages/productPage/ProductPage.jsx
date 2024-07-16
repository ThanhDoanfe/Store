import React, { useEffect, useState } from "react";
import Navbar from "src/components/navbar/Navbar";
import Announcement from "src/components/announcement/Announcement";
import ProductList from "src/components/productList/ProductList";
import Footer from 'src/components/footer/Footer';
import Newsletter from 'src/components/newsletter/Newsletter';
import './ProductPage.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom';
import { colorArr, sizeArr } from 'src/data';
import Delay from 'src/components/delay/Delay';
import { useSelector } from 'react-redux';
import Popup from "src/components/popup/Popup";

export default function ProductPage() {
    const { isPublicFetching } = useSelector(state => state.publicAction)
    const location = useLocation();
    const category = location.pathname.split('/')[2]
    const [filter, setFilter] = useState({
        color: 'White',
        size: 'S',
    });
    const [sort, setSort] = useState('Newest');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    function handleFilter(which, value) {
        let copyState = { ...filter };
        copyState[which] = value;
        setFilter({
            ...copyState
        });
    }

    return (
        <div style={{ overflow: 'hidden' }}>
            <Delay showDelay={isPublicFetching} />
            <Announcement />
            <Navbar />
            <div className="productPageContainer">
                <div className="header">
                    <h1>{category[0].toUpperCase() + category.slice(1)}</h1>
                    <div className="filter">
                        <div className="left">
                            <span className="title">Color and Size:</span>
                            <div className="expand">
                                <span className="selected">{filter.color}<FontAwesomeIcon icon={faAngleDown} className='icon' /></span>
                                <div className="sub">
                                    {colorArr && colorArr.length > 0 && colorArr.map(item =>
                                        <span onClick={() => handleFilter('color', item)}>{item}</span>
                                    )}
                                </div>
                            </div>
                            <div className="expand">
                                <span className="selected">{filter.size}<FontAwesomeIcon icon={faAngleDown} className='icon' /></span>
                                <div className="sub">
                                    {sizeArr && sizeArr.length > 0 && sizeArr.map(item =>
                                        <span onClick={() => handleFilter('size', item)}>{item}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <span className="title">Sorted by:</span>
                            <div className="expand">
                                <span className="selected">{sort}<FontAwesomeIcon icon={faAngleDown} className='icon' /></span>
                                <div className="sub">
                                    <span onClick={() => setSort('Newest')}>Newest</span>
                                    <span onClick={() => setSort('Ascending')}>Ascending</span>
                                    <span onClick={() => setSort('Descending')}>Descending</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductList
                    isShowHeader={false}
                    category={category}
                    filter={filter}
                    sort={sort} />
                <Newsletter />
            </div>
            <Footer />
            <Popup />
        </div>
    )
}