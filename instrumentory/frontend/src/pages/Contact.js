import './Contact.css';

import React, { useContext, useState, useEffect } from 'react';

import AuthContext from '../context/AuthContext';
import GenHeader from '../components/GenHeader';
import AuthHeader from '../components/AuthHeader';
import GenFooter from '../components/GenFooter';
import AuthFooter from '../components/AuthFooter';

function Contact() {

    const { user } = useContext(AuthContext);
    // use this to autofill email if logged in

    const [name, setName] = useState(user ? user.first_name + ' ' + user.last_name : '');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [emailSentMessage, setEmailSentMessage] = useState('');

    const [images, setImages] = useState([]);
    // const [imageOne, setImageOne] = useState('');

    useEffect(() => {
        getUserEmail()

        if (images.length !== 0) {
            const full_page = document.getElementById('contact-page-content');
            for (let i = 0; i < images.length; i++) {
                if (images[i].image_name === 'contact_us_background') {
                    // setImageOne(images[i].image)
                    full_page.style.backgroundImage = `url(${images[i].image})`
                }
            }
        } else {
            getImages()
        }

    }, [images])

    let getUserEmail = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${user.user_id}`);
        let data = await response.json()
        setEmail(data.email)
    }

    let getImages = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/website_images/`);
        let data = await response.json()
        // console.log(data)
        setImages(data)
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/contact_emails/send/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name,
                'email': email,
                'message': message,
            })
        })
        let data = await response.json()
        // console.log(data.detail)
        if (response.status === 200) {
            const contact_us_message = document.getElementById('contact-us-message');

            setEmailSentMessage('Message Sent!');
            setMessage('');
            contact_us_message.value = ''; // this removes the message from the form after submission

            setTimeout(() => {
                setEmailSentMessage('');
            }, 3000) // this would be better if it were a tag that appeared at the top
        } else {
            setEmailSentMessage('')
            // this maybe should display an error in the red color, but I would need to use another state variable to change the color.
            // try, catch may work better here
        }
    }

  return (
    <div id="contact-full-page">
        {user ? <AuthHeader /> : <GenHeader />}
        <div id="contact-page" className='page'>
            <div id="contact-page-content">
                <h1>Have a question or comment?</h1>
                <h2>Fill out the form below and we will get back to you as soon as we can!</h2>
                <div className='card contact-card'>
                    <form id="contact-form" onSubmit={sendEmail}>
                        <p id="contact-card-header">Send us a message!</p>
                        <input type="text" name='name' placeholder='Name' value={name} onChange={e => setName(e.target.value)}/>
                        <input type="email" name="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
                        <textarea id="contact-us-message" cols="26" rows="5" name="message" placeholder='Message' onChange={e => setMessage(e.target.value)}/>
                        <p id="email-sent-message-contact">{emailSentMessage}</p>
                        <input id="submit-message-button" className="button-primary login-button" type="submit" value="Send" />
                    </form>
                </div>
            </div>
        </div>
        {user ? <AuthFooter /> : <GenFooter />}
    </div>
    // need drop down for common issues and one for other cat
    // other cat will also open a text box to type specific other
  )
}

export default Contact