import React from 'react';
import './CategoryItem.scss'
import { useNavigate } from 'react-router-dom';

export default function CategoryItem(props) {
    const navigate = useNavigate();
    function navigation(whichPage) {
        navigate(`/${whichPage}`);
    }
    return (
        <div className="categoryItemContainer"
        >
            {/* <div className="img"
                style={{
                    background: `url('${props.itemImg}') no-repeat center center`
                }}>
            </div> */}
            <img src={`${props.itemImg}`} />
            <div className="content">
                <span className="title">{props.itemTitle}</span>
                <div className="button" onClick={() => navigation(`products/${props.categoryName}`)}>Shop now</div>
            </div>
        </div>
    )
}