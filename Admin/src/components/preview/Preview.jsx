import React from "react";
import './Preview.scss'

export default function Preview(props) {
    const imgData = props.imgData
    let arr = []
    if (Array.isArray(imgData))
        arr = [...imgData]
    else
        for (let i = 0; i < imgData.length; i++) arr.push(URL.createObjectURL(imgData.item(i)))
    return (
        <div className="previewContainer">
            <div className="wrapper"
                style={{ gridTemplateColumns: `repeat(${arr.length}, 50%)` }}>
                {arr && arr.length > 0 && arr.map(item => <div className="slide"><img src={item} /></div>)}
            </div>
        </div>
    )
}