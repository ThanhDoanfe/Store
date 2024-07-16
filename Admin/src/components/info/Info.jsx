import React from 'react';
import './Info.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function Info(props) {
    return (
        <div className="infoContainer">
            <span className="title">{props.title}</span>
            <div className="content">
                <span className="income">{props.income}</span>
                <div className="detail">
                    <span>{props.incre ? `+${props.detail}` : `-${props.detail}`}</span>
                    <FontAwesomeIcon
                        icon={props.incre ? faArrowUp : faArrowDown}
                        className={props.incre ? 'incr' : 'decr'} />
                </div>
            </div>
            <span className="description">Compare to last month</span>
        </div>
    )
}