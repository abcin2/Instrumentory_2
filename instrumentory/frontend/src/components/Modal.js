import React from 'react'
import './Modal.css';

function Modal({ 
  display, 
  headerText, 
  bodyText, 
  button1, 
  button2, 
  button1Click, 
  button2Click,
  backgroundRef,
  closeButtonRef
 }) {

  // useEffect(() => {
  //   console.log(background)
  //   console.log(container)
  // }, [])

  return (
    <div ref={backgroundRef} style={{'display': display}} className='modal-background'>
      <div className='modal-container card'>
        <section className='modal-header'>
          <p className='modal-header-text'>{headerText}</p> <span ref={closeButtonRef} className='modal-close-button'>&times;</span>
        </section>
        <section className='modal-body'>
          <p>{bodyText}</p>
        </section>
        <section className='modal-footer'>
          <button className='button1 button-success' onClick={button1Click}>{button1}</button>
          <button className='button2 button-danger' onClick={button2Click}>{button2}</button>
        </section>
      </div>
    </div>
  )
}

export default Modal