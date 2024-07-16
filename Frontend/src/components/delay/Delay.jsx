import React from 'react';
import './Delay.scss';
import Loading from 'src/components/loading/Loading';

export default function Delay({ showDelay }) {
    return (
        <div className="delayContainer" style={{ display: showDelay ? 'flex' : 'none' }}>
            <Loading />
        </div>
    )
}