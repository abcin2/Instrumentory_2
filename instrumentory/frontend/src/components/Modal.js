import React from 'react'
import './Modal.css';

function Modal(isActive) {
  return (
    <div hidden={isActive} className='modal-background'>
      <div className='modal-container'>
        <section className='modal-header'>
          Text and <span className='modal-close-button'>close button</span>
        </section>
        <section className='modal-body'>
          This is where the text of the modal will go
        </section>
        <section className='modal-footer'>
          This is most likely where the buttons will go
        </section>
      </div>
      This will most likely be the size of page to facilitate background
    </div>
  )
}

export default Modal