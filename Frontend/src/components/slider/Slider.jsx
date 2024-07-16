import React, { useState } from 'react';
import './Slider.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { slideArray } from '../../data.js';
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholderImg from "src/assets/img/placeholder.png"

export default function Slider() {
    const [moveValue, setMoveValue] = useState(0);

    function handleSlide(direction) {
        switch (direction) {
            case 'left':
                setMoveValue(moveValue + 100);
                break;
            case 'right':
                setMoveValue(moveValue - 100)
                break;
        }
    }

    function isHiddenArrow(direction) {
        const value = document.querySelector('.wrapper').style.transform
        console.log(value)
        let unit
        if (value[11] === '-') unit = parseInt(value.substring(11, 4))
        else unit = parseInt(value.splice(11, 3))

        switch (direction) {
            case 'left':
                return unit == 0 ? true : false
            case 'right':
                return unit == (slideArray.length - 1) * -100 ? true : false
        }
    }

    return (
        <div className='sliderContainer'>
            <div className='arrowLeft'
                onClick={() => handleSlide('left')}
                style={{ display: moveValue == 0 ? 'none' : 'flex' }}>
                <FontAwesomeIcon icon={faCaretLeft} className='icon' />
            </div>
            <div className='wrapper'
                style={{ transform: `translateX(${moveValue}vw)` }}>
                {slideArray && slideArray.length > 0 &&
                    slideArray.map((item, index) => {
                        return (
                            <div className='slide'
                                style={{ backgroundColor: `#${item.background}` }}>
                                {/* <div className='leftCorner'>
                                    <div></div>
                                </div>
                                <div className='rightCorner'>
                                    <div></div>
                                </div> */}
                                <div className='imgContainer'>
                                    <div className='circle'>
                                        <div className='one'></div>
                                        <div className='two'></div>
                                        <div className='three'></div>
                                        <div className='four'></div>
                                    </div>
                                    {/* <img src={item.img} /> */}
                                    <LazyLoadImage src={item.img}
                                        throttle={0}
                                        PlaceholderSrc={placeholderImg}
                                        className='lazyImg'
                                        effect="blur"
                                    />
                                </div>
                                <div className='infoContainer'>
                                    <h1 className='title'>{item.title}</h1>
                                    <span className='description'>{item.description}</span>
                                    <div className='button'><a href='#categoriesContainer'>Shop now</a></div>
                                </div>
                            </div>
                        )
                    })}
            </div>
            <div className='arrowRight'
                onClick={() => handleSlide('right')}
                style={{ display: moveValue == (slideArray.length - 1) * -100 ? 'none' : 'flex' }}>
                <FontAwesomeIcon icon={faCaretRight} className='icon' />
            </div>
        </div>
    )
}