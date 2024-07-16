import React, { useState } from "react";
import './Preview.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholderImg from "src/assets/img/placeholder.png"

export default function Preview(props) {
    const imgData = props.imgData
    const [unit, setUnit] = useState(0)

    return (
        <div className="previewContainer">
            <div className="leftArrow"><FontAwesomeIcon icon={faCaretLeft} className='icon'
                onClick={() => setUnit(unit < 0 ? unit + 100 : 0)} /></div>
            <div className="center">
                <div className="wrapper"
                    style={{ gridTemplateColumns: `repeat(${imgData.length}, 25%)` }}>
                    {imgData && imgData.length > 0 && imgData.map(item => {
                        return (
                            <div className="slide"
                                style={{ transform: `translateX(${unit}px)` }}
                                onClick={() => props.setMainImg(item)}>
                                <LazyLoadImage src={item}
                                    throttle={1000}
                                    PlaceholderSrc={placeholderImg}
                                    className='smallImg'
                                    effect="blur"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="rightArrow"><FontAwesomeIcon icon={faCaretRight} className='icon'
                onClick={() => setUnit(unit / -100 <= imgData.length - 1 ? unit - 100 : unit)} /></div>
        </div>
    )
}