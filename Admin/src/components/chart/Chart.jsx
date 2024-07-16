import React from 'react';
import './Chart.scss';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart(props) {
    return (
        <div className='chartContainer'>
            <h2 className='title'>{props.title}</h2>
            <div className='content'>
                <ResponsiveContainer width='100%' aspect={4 / 1}>
                    <LineChart data={props.data}>
                        <XAxis dataKey='name' stroke='#5550bd' />
                        <Line type='monotone' dataKey={props.dataKey} stroke='#5550bd' />
                        <Tooltip />
                        <CartesianGrid strokeDasharray='5 5' />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}