import './Login.css'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import AutoComplete from '../components/AutoComplete'

function Register() {

    const history = useNavigate()
    const ref = useRef()

    // for auto-complete options
    const [clickOnDistrictInput, setClickOnDistrictInput] = useState()
    const [clickOnSiteInput, setClickOnSiteInput] = useState()

    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    const [role, setRole] = useState('');
    // eslint-disable-next-line
    const [schoolDistrict, setSchoolDistrict] = useState('');
    // eslint-disable-next-line
    const [schoolSite, setSchoolSite] = useState('');

    const [districtOptions, setDistrictOptions] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [siteOptions, setSiteOptions] = useState([])

    let district_input_value = ref.current ? ref.current.children[0].children[0].value : null
    let site_input_value = ref.current ? ref.current.children[1].children[0].value : null

    useEffect(() => {

        getSchoolInfo()
        setSites()

    // eslint-disable-next-line
    }, [district_input_value])

    let getSchoolInfo = async () => {
        const district_array = []

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/districts/`)
        let data = await response.json()
        setDistrictData(data)
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            district_array.push(data[i].name)
        }

        setDistrictOptions(district_array)
    }

    let setSites = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/districts/`)
        let data = await response.json()
        for (let i = 0; i < data.length; i++) {
            if (data[i].name === district_input_value) {
                setSiteOptions(data[i].site)
            }
        }
    }

    // variables for each DOM step
    let stepOne = document.getElementById("register-card-step-one");
    let stepTwo = document.getElementById("register-card-step-two");
    let stepThree = document.getElementById("register-card-step-three");
    
    const setRoleTeacher = () => {
        setRole('Teacher');
        stepOne.style.display = 'none'
        stepTwo.style.display = 'block'
        stepThree.style.display = 'none'
    }

    const setRoleStudent = () => {
        setRole('Student');
        stepOne.style.display = 'none'
        stepTwo.style.display = 'block'
        stepThree.style.display = 'none'
    }

    const setSchoolInfo = () => {
        stepOne.style.display = 'none'
        stepTwo.style.display = 'none'
        stepThree.style.display = 'block'
    }

    // BACK TO PREVIOUS STEP BUTTONS

    const backToStepOne = () => {
        stepOne.style.display = 'block'
        stepTwo.style.display = 'none'
        stepThree.style.display = 'none'
    }

    const backToStepTwo = (e) => {
        e.preventDefault()
        stepOne.style.display = 'none'
        stepTwo.style.display = 'block'
        stepThree.style.display = 'none'
    }

    useEffect(() => {

        if (images.length !== 0) {
            const full_page = document.getElementById('register-full-page')
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

    // try adding a user manually in rest framework
    const submitForm = async (e) => {
        e.preventDefault()
        let broken_email = e.target.email.value.split('@')[0]
        if (e.target.password.value === e.target.confirm_password.value) {
            // if statement to check if district email matches what is in database
            for (let i = 0; i < districtData.length; i++) {
                if (districtData[i].name === district_input_value) {
                    if (districtData[i].verify_district_email === e.target.email.value.split('@')[1]) {
                        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/register/`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                'username': broken_email,
                                'email': e.target.email.value,
                                'password1': e.target.password.value,
                                'password2': e.target.confirm_password.value,
                                'group': role,
                                'school_district': district_input_value,
                                'school_site': site_input_value,
                                // need to find a way to confirm district
                                // for now district also includes what all district emails should be
                                // teachers and students can verify with district mail in order to ensure they are really part of the district
                            })
                        })
                        // eslint-disable-next-line
                        let user_data = await response.json()
                        if (response.ok) {
                            // try to update group and school info here
                            history('/verify_email_sent/')
                        } else {
                            alert('Something went wrong!')
                        }
                    } else {
                        alert('You must use your email associated with the school district you have selected.')
                    }
                } else {
                    alert('The school district you have entered does not exist in database. Please contact us so way may add your district to our records.')
                }
            }

        } else {
            setError('passwords must match')
        }
    }

    document.addEventListener("click", (e) => {
        if (document.activeElement.parentElement.parentElement === ref.current) {
            if (document.activeElement.placeholder === 'School District') {
                setClickOnDistrictInput(true)
                setClickOnSiteInput(false)
            } else if (document.activeElement.placeholder === 'School Site') {
                setClickOnSiteInput(true)
                setClickOnDistrictInput(false)
            }
        } else {
            setClickOnDistrictInput(false)
            setClickOnSiteInput(false)
        }
    }, false)

    // cannot target the onChange function here because onChange refers to the div that surrounds the inputs
    // somehow I need to target the input from here and get the value

  return (
    <div id='register-full-page'>
        <div className='page'>
            <div className='login-header'>
                <h3>welcome to:</h3>
                <h1>Instrumentory</h1>
                <h2>please create an account</h2>
            </div>
            <div id="register-card-step-one" className='card register-card'>
                <div className='fixer-wrapper'>
                    <div className='block-container'>
                        <div id='step-one-header'>
                            <p>Register as a</p>
                        </div>
                        <div id='step-one-body'>
                            <div id='step-one-buttons-container'>
                                <button onClick={setRoleTeacher} className='role-button button-primary'>Teacher</button>
                                <p>or</p>
                                <button onClick={setRoleStudent} className='role-button button-primary'>Student</button>
                            </div>
                        </div>
                        <div className="register-card-footer-links">
                            <div className='forgot-link'>
                                <a href='/login'>Login</a>
                            </div>
                            <div className='register-link'>
                                <a href='/forgot_password'>Forgot Password</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{'display': 'none'}} id="register-card-step-two" className='card register-card'>
                <div className='fixer-wrapper'>
                    <div className='block-container'>
                        <div id='step-two-header'>
                            School Information
                        </div>
                        <div id='step-two-body'>
                            <div ref={ref} id='step-two-inputs-container'>
                                <AutoComplete
                                clickOnInput={clickOnDistrictInput}
                                suggestions={districtOptions}
                                onChange={e => setSchoolDistrict(e.target.value)}
                                placeholder="School District"
                                class_suggestions="suggestions-district"
                                class_suggestion_active="suggestion-active-district"
                                class_no_suggestions="no-suggestions-district"
                                />
                                <AutoComplete 
                                clickOnInput={clickOnSiteInput}
                                suggestions={siteOptions} 
                                onChange={e => setSchoolSite(e.target.value)}
                                placeholder="School Site"
                                class_suggestions="suggestions-site"
                                class_suggestion_active="suggestion-active-site"
                                class_no_suggestions="no-suggestions-site"
                                />
                            </div>
                        </div>
                        <div id="step-two-footer">
                            <button onClick={backToStepOne} className='button-danger back-button'>back</button>
                            <button onClick={setSchoolInfo} className='button-primary'>Continue</button>
                        </div>
                        <div className="register-card-footer-links">
                            <div className='forgot-link'>
                                <a href='/login'>Login</a>
                            </div>
                            <div className='register-link'>
                                <a href='/forgot_password'>Forgot Password</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{'display': 'none'}} id="register-card-step-three" className='card register-card'>
                <div className='fixer-wrapper'>
                    <form onSubmit={submitForm}>
                        <div id='step-three-inputs-container'>
                            <input className='input-text login-input' type="email" name="email" placeholder="Email" />
                            <input style={{'marginBottom': '1rem'}} className='input-text login-input' type="password" name="password" placeholder="Password" />
                            <input className='input-text login-input' type="password" name="confirm_password" placeholder="Comfirm Password" />
                            <p id="error-text">{error}</p>
                        </div>
                        <div className='login-button'>
                            <button onClick={backToStepTwo} className='button-danger back-button'>back</button>
                            <input className="button-success" type="submit" value="Register" />
                        </div>
                    </form>
                    <div className="register-card-footer-links">
                        <div className='forgot-link'>
                            <a href='/login'>Login</a>
                        </div>
                        <div className='register-link'>
                            <a href='/forgot_password'>Forgot Password</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register