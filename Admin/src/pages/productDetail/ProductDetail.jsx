import React, { useMemo, useState, useEffect } from "react";
import Edit from 'src/components/edit/Edit';
import { productData } from 'src/data';
import Chart from 'src/components/chart/Chart';
import { useSelector, useDispatch } from 'react-redux';
import { editProduct } from 'src/redux/apiCalls';
import { useLocation } from "react-router-dom";
import { userRequest } from 'src/requestMethods';

export default function ProductDetail(props) {
    const location = useLocation();
    const pathId = location.pathname.split('/')[2];

    const { productList } = useSelector(state => state.product);
    const [product, setProduct] = useState(productList.find(item => item._id === pathId))

    const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec",], []);
    const [pStats, setPStats] = useState([])
    const getStats = async () => {
        try {
            const res = await userRequest.get(`/api/orders/income?pid=${product._id}`);
            if (res.data.income && res.data.income.length > 0) {
                const list = res.data.income.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    // useEffect(() => {
    //     getProduct()
    //     getStats();
    // }, [product._id, MONTHS]);

    useEffect(() => {
        getProduct()
    }, []);

    const getProduct = async () => {
        const res = await userRequest.get(`/api/products/find/${pathId}`)
        setProduct(res.data.product)
        console.log(product)
    }

    return (
        <>
            {product ? <Edit isEditUser={false}
                product={product}
                productData={pStats}
                dataKey='Sales'
                dataTitle='Sales Performance (last 3 months)' /> : <></>}
        </>
    )
}