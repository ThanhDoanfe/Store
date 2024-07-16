import React, { useState, lazy, Suspense } from 'react'
import Navbar from 'src/components/navbar/Navbar'
import Announcement from 'src/components/announcement/Announcement'
import Slider from 'src/components/slider/Slider'
import Categories from 'src/components/categories/Categories'
// import ProductList from 'src/components/productList/ProductList'
import Newsletter from 'src/components/newsletter/Newsletter'
import Footer from 'src/components/footer/Footer'
import Partition from 'src/components/partition/Partition'
import Popup from 'src/components/popup/Popup'
import { useSelector, useDispatch } from 'react-redux'
import Loading from 'src/components/loading/Loading'
import { closePopup } from 'src/redux/popupRedux'
import Delay from 'src/components/delay/Delay'

export default function Home() {
    const { isPublicFetching } = useSelector(state => state.publicAction)
    const dispatch = useDispatch()
    const ProductList = lazy(() => import('src/components/productList/ProductList'))

    window.onbeforeunload = () => { dispatch(closePopup()) }

    return (
        <div style={{
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Delay showDelay={isPublicFetching} />
            <Announcement />
            <Navbar />
            <Slider />
            <Partition />
            <Categories />
            <Suspense fallback={<Loading />}>
                <ProductList isShowHeader={true} />
            </Suspense>
            <Newsletter />
            <Footer />
            <Popup />
        </div>
    )
}
