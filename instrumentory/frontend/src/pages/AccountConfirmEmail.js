import React, { useState, useEffect } from 'react'

import './AccountConfirmEmail.css'

import { useParams } from 'react-router-dom'

function AccountConfirmEmail() {

    const { key } = useParams() // gets key from url

    const [disabled, setDisabled] = useState(false)
    const [email, setEmail] = useState('your_email')

    // Still need to call data before DOM loads.
    // Same thing for Verify Email Sent page.

    // call getEmail() on load
    useEffect(() => {

        if (email === 'your_email') {
            getEmail()
        }

    }, [])

    // dj-rest-auth/registration/views.py (added GET request which originally was not allowed)
    // get request passes the user email based on the key in the url
    const getEmail = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/account_confirm_email/${key}`); // this is called from api/urls.py
        let data = await response.json()
        setEmail(data.email ? data.email : 'account does not exist')
    }

    // activate account
    const activateAccount = async (e) => {
        e.preventDefault()
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/account_confirm_email/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'key': key,
            })
        })
        let data = await response.json()
        // response is just 'ok' message
        console.log(data)

        if (response.ok) {
            setDisabled(true)
            alert('Success!')
            // this will allow the user to make the decision instead of being redirected
            // I could also set a timer until redirect to login and display that
            // history('/login/')
        } else {
            setDisabled(true)
            alert('Account does not exist!')
        }
    } 

  return (
    <div id="account-confirm-email-full-page">
        <div className='page'>
            <h1>Thank you!</h1>
            <h2>Please click the button below to activate the account for <i>{email}</i>.</h2>
            <button disabled={disabled} onClick={activateAccount} id="activate-button" className='button-primary'>Activate!</button>
            <h3>If this is not your email, please leave this page now.</h3>
            <p>Already activated your account? <a href='/login/'>Login here</a>.</p>
        </div>
    </div>
  )
}

export default AccountConfirmEmail