import React, { useEffect, useState } from "react";
import './Large.scss';
import { userRequest } from 'src/requestMethods';
import moment from 'moment';

export default function Large() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const getOrders = async () => {
            const res = await userRequest.get('/api/orders/findAll')
            setOrders(res.data.orders)
        }
        getOrders()
    }, [])
    return (
        <div className="largeContainer">
            <h2 className="title">Latest Transactions</h2>
            <table>
                <th>
                    <td>Customer</td>
                    <td>Date</td>
                    <td>Amount</td>
                    <td>Status</td>
                </th>
                {orders && orders.length > 0 && orders.map(item => {
                    return (
                        <tr>
                            <td>
                                <span className="name">{item.userId}</span>
                            </td>
                            <td>{moment(item.createdAt).format('MM/DD/YYYY')}</td>
                            <td>{item.amount}</td>
                            <td>
                                <div
                                    className={`status ${item.status.toLowerCase()}`}>
                                    {item.status === 'approved' ? 'Approved' : item.status === 'rejected' ? 'Rejected' : 'Pending'}
                                </div>
                            </td>
                        </tr>
                    )
                })}
                {/* <tr>
                    <td>
                        <div className="avatar"></div>
                        <span className="name">John Wick</span>
                    </td>
                    <td>23 May 2022</td>
                    <td>$122.00</td>
                    <td>
                        <div className="status rejected">Rejected</div>
                    </td>
                </tr> */}
            </table>
        </div>
    )
}