import React, { useState, useEffect } from 'react'
import './VerifyEmailSent.css'

function VerifyEmailSent() {

    const [image, setImage] = useState('')

    useEffect(() => {

        if (image === '') {
            getImages()
        }
        
    }, [image])

    let getImages = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/website_images/`);
        let data = await response.json()
        for (let i = 0; i < data.length; i++) {
            if (data[i].image_name === 'successful_registration_image') {
                setImage(data[i].image)
                // console.log(data[i].image)
            }
        }
    }

  return (
    <div id="verify-email-sent-full-page">
        <div className='page'>
            <h1>Congratulations!</h1>
            <img alt='Stick figrues celebrating' id="congrats-image" src={image} />
            <h2>You have successfully registered for a new account.</h2>
            <h3>Please check your email and follow the instructions to activate your new account.</h3>
            <p>Already activated your account? <a href='/login/'>Login here</a>.</p>
        </div>
    </div>
  )
}

export default VerifyEmailSent