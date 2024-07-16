import React from "react";
import './Categories.scss'
import CategoryItem from '../categoryItem/CategoryItem'
import { categoryArray } from "../../data";

export default function Categories() {
    return (
        <div className="categoriesContainer" id="categoriesContainer">
            <div className="circleLeft">
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="four"></div>
            </div>
            <div className="circleRight">
                <div className="one"></div>
                <div className="two"></div>
            </div>
            <div className="title">
                <h1>Our Collections</h1>
            </div>
            <div className="content">
                {categoryArray && categoryArray.length > 0 &&
                    categoryArray.map((item, index) => {
                        return (
                            <CategoryItem
                                itemImg={item.img}
                                itemTitle={item.title}
                                categoryName={item.categoryName}
                            />
                        )
                    })}
            </div>
        </div>
    )
}