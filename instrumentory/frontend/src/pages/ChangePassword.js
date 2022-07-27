import './ChangePassword.css';

import React, { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom';

function ChangePassword() {

    const {id, pk, key} = useParams();

    const history = useNavigate()

    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [email, setEmail] = useState('your_email')
    const [error, setError] = useState('')


    useEffect(() => {

        if (email === 'your_email') {
            getEmail()
        }

    }, [])

    const getEmail = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${id}`); // this is called from api/urls.py
        let data = await response.json()
        setEmail(data.email ? data.email : 'account does not exist')
    }

    const changePassword = async (e) => {
        const form = document.getElementById('new-password-form');
        e.preventDefault()
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/password_reset_confirm/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'new_password1': newPassword,
                'new_password2': confirmNewPassword,
                'uid': pk,
                'token': key,
            })
        })
        let data = await response.json()
        console.log(data)
        if (data.detail) {
            alert(data.detail)
            history('/login/')
        } else {
            setError('Error detected, please try again.')
            setNewPassword('')
            setConfirmNewPassword('')
            form.reset()
        }
    }

  return (
    <div id="change-password-full-page">
        <div className='page'>
            <h1>Change Password</h1>
            <h2>for account <i>{email}</i></h2>
            <div className='card'>
            <form id="new-password-form" onSubmit={changePassword}>
                <input type="password" name="new-password" className='change-password-input' onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password"/>
                <input type="password" name="confirm-new-password" className='change-password-input' onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Confirm New Password"/>
                <p>{error}</p>
                <input type='submit' name='submit' className='change-password-button button-primary' value="Change Password"/>
            </form>
            </div>
        </div>
    </div>
  )
}

export default ChangePassword