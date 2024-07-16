import React, { useEffect, useState } from "react";
import './ProductList.scss';
import Product from '../product/Product'
import { productArray } from '../../data.js'
import { publicRequest } from '../../requestMethod.js';
import Loading from 'src/components/loading/Loading';

export default function ProductList(props) {
    const { category, filter, sort } = props;
    const [products, setProducts] = useState([]);
    useEffect(() => {
        console.log('category', category)
        let getProducts = async () => {
            try {
                const res = await publicRequest.get(
                    category
                        ? `/api/products/findAll?getByCategories=${category}`
                        : `/api/products/findAll?getNewest=true`
                )
                setProducts([...res.data.products]);
                console.log(products);
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [])
    return (
        <div className="productListContainer">
            <div className="circleLeft"
                style={{
                    display: props.isShowHeader ? 'block' : 'none'
                }}>
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="four"></div>
            </div>
            <div className="circleRight"
                style={{
                    display: props.isShowHeader ? 'block' : 'none'
                }}>
                <div className="one"></div>
                <div className="two"></div>
            </div>
            <div className="title"
                style={{
                    display: props.isShowHeader ? 'block' : 'none'
                }}>
                <h1>Popular Items</h1>
            </div>
            <div className="content">
                {products.length === 0 && <Loading />}
                {products && products.length > 0 && category &&
                    products
                        .filter((item, index) => {
                            return item.color.includes(filter.color.toLowerCase())
                                || item.size.includes(filter.size.toLowerCase());
                        })
                        .sort((a, b) => {
                            switch (sort) {
                                case 'Newest':
                                    return a.createdAt - b.createdAt;
                                case 'Ascending':
                                    return a.price - b.price;
                                case 'Descending':
                                    return b.price - a.price;
                            }
                        })
                        .map((item, index) => {
                            return (
                                <Product itemImg={item.img[0]}
                                    itemTitle={item.title}
                                    itemId={item._id} />
                            )
                        })
                }
                {products && products.length > 0 && !category &&
                    products.map((item, index) => {
                        if (index < 8) {
                            return (
                                <Product itemImg={item.img[0]}
                                    itemTitle={item.title}
                                    itemId={item._id}
                                    product={item} />
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}