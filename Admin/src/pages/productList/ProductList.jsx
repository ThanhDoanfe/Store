import React, { useEffect, useState } from "react";
import { productRows } from 'src/data';
import List from 'src/components/list/List';
import { getAllProduct } from 'src/redux/apiCalls';
import { useDispatch, useSelector } from "react-redux";

export default function ProductList() {
    const dispatch = useDispatch()
    const { productList, isFetching } = useSelector(state => state.product)
    useEffect(() => {
        if (isFetching === false) getAllProduct(dispatch)
    }, [])
    return (
        <>
            {productList && productList.length > 0 && !isFetching && <List data={productList}
                isUserList={false} />}
        </>
    )
}