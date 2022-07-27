import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);
    const [loginError, setLoginError] = useState('');

    const history = useNavigate()

    let loginUser = async (email, password) => {
        // e.preventDefault()
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': email, 'password': password})
        })
        let data = await response.json()
        // console.log(response.status)

        if (response.status === 401) {
            setLoginError('Incorrect password. Please try again.')
        }

        if (response.ok) {
            setLoginError('')
            let validationResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/email_validation/${jwt_decode(data.access)['user_id']}/`)
            let validationData = await validationResponse.json()
            if (validationData['verified'] === true) {
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
                let groupResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${validationData['user']}`)
                let groupData = await groupResponse.json()
                if (groupData['groups'].length === 0) {
                    history('/account_setup')
                } else {
                    history('/dashboard')
                }
            } else {
                return false
                // alert('You must verify your email before you can use this account!')
                // open modal and send another email for verification
            }
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        // history('/login')
    }

    let updateToken = async () => {
        // console.log('Update Token Called')
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens?.refresh})
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        loginError:loginError,
    }

    useEffect(() => {

        if (loading) {
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)

        return () => clearInterval(interval)

    // eslint-disable-next-line
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}