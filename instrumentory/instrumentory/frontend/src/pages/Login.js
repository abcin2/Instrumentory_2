import './Login.css'
import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';


function Login() {

    let {loginUser, loginError} = useContext(AuthContext)

    const [images, setImages] = useState([]);
    const [email, setEmail] = useState();
    const [sending, setSending] = useState(false);
    const [emailSendMessage, setEmailSendMessage] = useState('');

    const emailDict = {};

    // resolves promise and then checks if it returns 'false'
    const testActivation = (e) => {
        e.preventDefault()
        const email_input = document.getElementById('email-input')
        const password_input = document.getElementById('password-input')

        loginUser(email_input.value, password_input.value).then((bool) => {
            if (bool === false) {
                const get_verified_modal = document.getElementById('not-verified-modal');
                const background_page = document.getElementById('modal-background');
                const full_page = document.body;
    
                background_page.classList.add('background-gray');
                // background_page.classList.add('fadeIn');
    
                full_page.classList.add('disable-scroll');
    
                get_verified_modal.classList.remove('display-none');
                get_verified_modal.classList.add('display-block');
                get_verified_modal.classList.add('modal-trans');

                // this will most likely be changed.
            } else if (bool === undefined) {

                if (emailDict[email.value] >= 3) {
                    console.log('entered incorrect password 3 times. Need to reset.')
                }

                if (emailDict[email.value] !== undefined) {
                    emailDict[email.value] += 1
                } else {
                    emailDict[email.value] = 1
                }
            }
        })
    }

    // click outside modal
    const background_page = document.getElementById('modal-background');
    if (background_page) {
        background_page.addEventListener('click', () => {

            const get_verified_modal = document.getElementById('not-verified-modal');
            const full_page = document.body;
    
            background_page.classList.remove('background-gray');
    
            full_page.classList.remove('disable-scroll');
    
            get_verified_modal.classList.add('display-none');
            get_verified_modal.classList.remove('display-block');

            setEmailSendMessage('');

        })
    }

    useEffect(() => {

        if (images.length !== 0) {
            const full_page = document.getElementById('login-full-page')
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

    // POST request for resend email activation
    let sendEmail = async () => {
        setSending(true);
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/resend_email/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email': email})
        })
        // eslint-disable-next-line
        let data = await response.json()

        if (response.ok) {
            setEmailSendMessage('Email Sent!')
        }
        // console.log(data)
        setSending(false);
    } 

  return (
    <div id='login-full-page'>
        <div id='modal-background'></div>
        <div id='test' className='page'>
            <div id="not-verified-modal" className='display-none card resend-card'>
                <div>Oops! It looks like you haven't activated your account yet!</div>
                <div>Didn't recieve an email?</div>
                <button className='button-success' disabled={sending} onClick={sendEmail} >Resend Email</button>
                <p id='email-send-message'>{emailSendMessage}</p>
            </div>
            <div className='login-header'>
                <h3>welcome to:</h3>
                <h1>Instrumentory</h1>
                <h2>please login below</h2>
            </div>
            <div className='card register-card'>
                <div className='fixer-wrapper'>
                    <form id="login-form" onSubmit={testActivation}>
                        <input id='email-input' onChange={(e) => setEmail(e.target.value)} className='input-text login-input' type="email" name="email" placeholder="Email" />
                        <input id='password-input' className='input-text login-input' type="password" name="password" placeholder="Password" />
                        <p id="login-error-message">{loginError}</p>
                        <input className="button-primary login-button" type="submit" value="Login" />
                    </form>
                    <div className='register-card-footer-links'>
                        <div className='forgot-link'>
                            <a href='/forgot_password'>Forgot Password</a>
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

export default Login