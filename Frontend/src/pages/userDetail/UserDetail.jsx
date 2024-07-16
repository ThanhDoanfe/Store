import React, { useState, lazy, Suspense } from 'react'
import Navbar from 'src/components/navbar/Navbar'
import Announcement from 'src/components/announcement/Announcement'
import Newsletter from 'src/components/newsletter/Newsletter'
import Footer from 'src/components/footer/Footer'
import { useSelector, useDispatch } from 'react-redux'
import Edit from 'src/components/edit/Edit'
import Popup from 'src/components/popup/Popup'
import { closePopup } from 'src/redux/popupRedux'
import Delay from 'src/components/delay/Delay'

export default function UserDetail() {
    const { isFetching } = useSelector(state => state.user)
    const { isPublicFetching } = useSelector(state => state.publicAction)
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()

    window.onbeforeunload = () => { dispatch(closePopup()) }
    window.scrollTo(0, 0)

    return (
        <div style={{
            position: 'relative',
            overflow: 'hidden',
        }}>
            <Delay showDelay={isFetching || isPublicFetching} />
            <Announcement />
            <Navbar />
            <Edit currentUser={currentUser} />
            <Newsletter />
            <Footer />
            <Popup />
        </div>
    )
}
