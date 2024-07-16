import React from 'react';
import Navbar from "src/components/navbar/Navbar";
import Announcement from "src/components/announcement/Announcement";
import Footer from 'src/components/footer/Footer';
import Newsletter from 'src/components/newsletter/Newsletter';
import Info from 'src/components/info/Info';
import Popup from 'src/components/popup/Popup';
import Delay from 'src/components/delay/Delay';
import { useSelector } from 'react-redux';

export default function Introduction() {
    const { isPublicFetching } = useSelector(state => state.publicAction)
    return (
        <div style={{
            overflow: 'hidden',
            position: 'relative'
        }}>
            <Delay showDelay={isPublicFetching} />
            <Announcement />
            <Navbar />
            <Info />
            <Newsletter />
            <Footer />
            <Popup />
        </div>
    )
}