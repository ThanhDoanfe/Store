import React from 'react';
import './Footer.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTree,
    faLocationDot, faPhone, faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
    return (
        <div className="footerContainer">
            <div className="header">
                <h1>rêu.<FontAwesomeIcon icon={faTree} /></h1>
                <span>Useful Links</span>
                <span>Contact</span>
            </div>
            <div className="content">
                <div className="intro">
                    <p>Yellow Leaf Hammocks tell users about its product by describing how the hammocks empower artisan weavers and their families. The company breaks down different pieces of the story into sections that combine words and easily digestible graphics.</p>
                    <div className="icons">
                        <div className="icon"><FontAwesomeIcon icon={faFacebook} /></div>
                        <div className="icon"><FontAwesomeIcon icon={faTwitter} /></div>
                        <div className="icon"><FontAwesomeIcon icon={faInstagram} /></div>
                        <div className="icon"><FontAwesomeIcon icon={faYoutube} /></div>
                    </div>
                </div>
                <div className="links">
                    <div className="left">
                        <a>Home</a>
                        <a>Man Fashion</a>
                        <a>Accessories</a>
                        <a>Order Tracking</a>
                        <a>Wishlist</a>
                    </div>
                    <div className="right">
                        <a>Cart</a>
                        <a>Woman Fashion</a>
                        <a>My Account</a>
                        <a>Wishlist</a>
                        <a>Terms</a>
                    </div>
                </div>
                <div className="contact">
                    <span><FontAwesomeIcon icon={faLocationDot} className='icon' />16 Le Loi Street, Thu Duc District, Ho Chi Minh City</span>
                    <span><FontAwesomeIcon icon={faPhone} className='icon' />+1 234 5678</span>
                    <span><FontAwesomeIcon icon={faEnvelope} className='icon' />example@gmail.com</span>
                </div>
            </div>
        </div>
    )
}