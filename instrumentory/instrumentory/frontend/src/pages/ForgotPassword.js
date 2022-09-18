import './Login.css'
import React, { useState, useEffect } from 'react'

function ForgotPassword() {

    const [images, setImages] = useState([]);
    const [email, setEmail] = useState('');
    const [emailSentMessage, setEmailSentMessage] = useState('');

    useEffect(() => {

        if (images.length !== 0) {
            const full_page = document.getElementById('forgot-full-page')
            for (let i = 0; i < images.length; i++) {
                if (images[i].image_name === 'register_background_image') {
                    full_page.style.backgroundImage = `url(${images[0].image})`
                }
            }
        } else {
            getImages()
        }
        
    }, [images])


    let getImages = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/website_images/`);
        let data = await response.json()
        // console.log(data)
        setImages(data)
    }

    const submitForm = async (e) => {
        e.preventDefault()
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/change_password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email': email})
        })
        let data = await response.json()
        // console.log(data.detail)
        if (response.ok) {
            setEmailSentMessage(data.detail)
        } else {
            setEmailSentMessage('')
            // this maybe should display an error in the red color, but I would need to use another state variable to change the color.
        }
    } 

  return (
    <div id='forgot-full-page'>
        <div className='page'>
            <div className='login-header'>
                <h3>welcome to:</h3>
                <h1>Instrumentory</h1>
                <h2>please enter your email below</h2>
            </div>
            <div className='card forgot-password-card'>
                <div className='fixer-wrapper'>
                    <form onSubmit={submitForm}>
                        <input 
                        id="forgot-email-input" 
                        className='input-text login-input' 
                        type="email" 
                        name="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email" 
                        />
                        <p id="email-sent-message">{emailSentMessage}</p>
                        <input 
                        id="send-email-button"
                        className="button-success login-button" 
                        type="submit" 
                        value="Send Email" 
                        />
                    </form>
                    <div className="register-card-footer-links">
                        <div className='forgot-link'>
                            <a href='/login'>Login</a>
                        </div>
                        <div className='register-link'>
                            <a href='/register'>Register</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword