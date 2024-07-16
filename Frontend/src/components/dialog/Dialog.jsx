import React, { useEffect } from 'react';
import './Dialog.scss'

export default function Dialog({ openDialog, closeDialog, confirm }) {
    const dialog = document.querySelector('.dialog')
    if (openDialog) dialog.showModal()

    function handleCloseDialog() {
        closeDialog()
        dialog.close()
    }

    function handleConfirm() {
        confirm()
        dialog.close()
    }

    return (
        <div className='dialogContainer' style={{ display: openDialog ? 'block' : 'none' }}>
            <dialog className='dialog'>
                <h1>Do you really want to log out?</h1>
                <button onClick={handleCloseDialog} className='cancel'>Cancel</button>
                <button onClick={handleConfirm} className='yes'>Yes</button>
            </dialog>
        </div>
    )
}