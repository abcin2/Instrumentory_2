import './Home.css';

import React, { useState, useEffect, useContext } from 'react';

import AuthContext from '../context/AuthContext';

import AuthHeader from '../components/AuthHeader';
import GenHeader from '../components/GenHeader';
import AuthFooter from '../components/AuthFooter';
import GenFooter from '../components/GenFooter';


function Home() {

    const { user } = useContext(AuthContext);

    const [images, setImages] = useState([]);
    const [imageOne, setImageOne] = useState('');

    useEffect(() => {
        // checks if images have been requested from DB
        if (images.length !== 0) {
            // cycles through images and returns 'home_banner_image'
            for (let i = 0; i < images.length; i++) {
                if (images[i].image_name === 'home_banner_image') {
                    setImageOne(images[i].image)
                }
            }
        // if images array is empty, it means that the images have not been returned from DB, so it needs to make the request again
        } else {
            getImages()
        }
    }, [images])

    // gets all images from database, stored in AWS
    let getImages = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/website_images/`);
        let data = await response.json()
        // console.log(data)
        setImages(data)
    }

  return (
    <div id="home-full-page">
        {user ? <AuthHeader /> : <GenHeader />}
        <div className='page'>
            <div className='title'>
                <img alt='A teacher helping a young musician play upright bass' id="home-image-one" src={imageOne} />
                <div id="title-text">
                    <h1>Instrumentory</h1>
                    <h2>Organize your program so you can focus on what really matters.</h2>
                </div>
            </div>
            <div id="home-section-two">
                <div className='col-one'>
                    <h3>Features</h3>
                    <div className='ul-flex'>
                        <div className='h3-ul-div'>
                            <ul>
                                <li>create, send and sign rental agreements</li>
                                <li>create unique bar codes</li>
                                <li>log repair information</li>
                                <li>collaborate with other teachers</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-two'>
                    <h3>Benefits</h3>
                    <div className='ul-flex'>
                        <div className='h3-ul-div'>
                            <ul>
                                <li>save time</li>
                                <li>organize your program</li>
                                <li>make repeated tasks a breeze</li>
                                <li>focus on what matters most</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="home-section-three">
                <div className='s3-container'>
                    <div id="home-s3-header">
                        <h3>Take inventory at the end of each year!</h3>
                        <p>So easy, a student could do it!</p>
                    </div>
                    <div id="home-s3-steps">
                        <p><strong>Step 1</strong>: Generate barcodes for all instruments in your inventory</p>
                        <p><strong>Step 2</strong>: Print and secure barcodes to all instruments</p>
                        <p><strong>Step 3</strong>: Scan all barcodes through our specially designed app (coming soon)</p>
                    </div>
                    <div id="home-s3-p">
                        <p>Instrumentory lists what you are missing and the last person in possession of the instrument!</p>
                    </div>
                </div>
            </div>
            <div id="home-section-four">
                <div className='s4-container'>
                    Instrumentory will now send notifications to students and parents when it is time to return their instrument!
                </div>
            </div>
        </div>
        {user ? <AuthFooter /> : <GenFooter />}
    </div>
  )
}

export default Home