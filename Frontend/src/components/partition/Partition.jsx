import React from 'react';
import './Partition.scss'
import { useNavigate } from 'react-router';

export default function Partition() {
    const navigate = useNavigate()
    return (
        <div className="partitionContainer">
            <h1>What We Do?</h1>
            <p>Reu. is a leading edge fashion streetwear specialist, providing style conscious customers with innovative clothes  to suit every occasion. We pride on our unique product range - created by our in-house design team and global brand partnerships, all of which are recognisable by their individuality, design and quality.</p>
            <div className='button'
                onClick={() => navigate('/introduction')}>Learn More</div>
        </div>
    )
}