import './WhatsNext.css';
import React, { useContext } from 'react';

import AuthContext from '../context/AuthContext';
import GenHeader from '../components/GenHeader';
import AuthHeader from '../components/AuthHeader';
import GenFooter from '../components/GenFooter';
import AuthFooter from '../components/AuthFooter';

function WhatsNext() {

    const { user } = useContext(AuthContext);

  return (
    <div id='whatsnext-full-page'>
        {user ? <AuthHeader /> : <GenHeader />}
        <div id='whatsnext-page' className='page'>
            <h1>What's Next Page</h1>
            <p>In development...</p>
        </div>
        {user ? <AuthFooter /> : <GenFooter />}
    </div>
  )
}

export default WhatsNext