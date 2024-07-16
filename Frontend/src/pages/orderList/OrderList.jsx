import React from 'react';
import Navbar from 'src/components/navbar/Navbar'
import Announcement from 'src/components/announcement/Announcement'
import Newsletter from 'src/components/newsletter/Newsletter'
import Footer from 'src/components/footer/Footer'
import { useSelector, useDispatch } from 'react-redux'
import Popup from 'src/components/popup/Popup'
import { closePopup } from 'src/redux/popupRedux'
import Delay from 'src/components/delay/Delay'
import OrderPreview from 'src/components/order/OrderPreview'
import './OrderList.scss'

export default function OrderList() {
    const dispatch = useDispatch()
    window.onbeforeunload = () => { dispatch(closePopup()) }
    window.scrollTo(0, 0)

    return (
        <div style={{
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* <Delay showDelay={isFetching || isPublicFetching} /> */}
            <Announcement />
            <Navbar />
            <div className="orderList">
                <h1>YOUR ORDER</h1>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Items</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                    <tr className='row'>
                        <td>currently developing</td>
                        <td>currently developing</td>
                        <td>currently developing</td>
                        <td>currently developing</td>
                        <td>currently developing</td>
                    </tr>
                    <tr className='row'>
                        <td>currently developing</td>
                        <td>currently developing</td>
                        <td>currently developing</td>
                        <td>currently developing</td>
                        <td>currently developing</td>
                    </tr>
                    <tr className='row'>
                        <td>currently developing</td>
                        <td>currently developing</td>
                        <td>currently developing</td>
                        <td>currently developing</td>
                        <td>currently developing</td>
                    </tr>
                </table>
            </div>
            <Newsletter />
            <Footer />
            <Popup />
        </div>
    )
}