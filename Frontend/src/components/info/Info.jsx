import React from 'react';
import './Info.scss'
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholderImg from "src/assets/img/placeholder.png"

export default function Info() {
    window.scrollTo(0, 0);
    return (
        <div className="aboutContainer">
            <LazyLoadImage src='https://res.cloudinary.com/dp0ymr8ty/image/upload/v1693826320/woman-2564660_1280_lhcbve.jpg'
                throttle={0}
                PlaceholderSrc={placeholderImg}
                className='lazyImg'
                effect="blur"
            />
            <div className='introInfo'>
                <h1>About Us</h1>
                <p>Reu. is a leading edge fashion streetwear specialist, providing style conscious customers with innovative clothes  to suit every occasion. We pride on our unique product range - created by our in-house design team and global brand partnerships, all of which are recognisable by their individuality, design and quality.</p>
            </div>
        </div>
    )
}