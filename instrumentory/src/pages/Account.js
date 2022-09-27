import './Account.css';
import React, { useContext } from 'react';

import AuthContext from '../context/AuthContext';
import GenHeader from '../components/GenHeader';
import AuthHeader from '../components/AuthHeader';
import GenFooter from '../components/GenFooter';
import AuthFooter from '../components/AuthFooter';

function Account() {

    const { user } = useContext(AuthContext);

  return (
    <div id='account-full-page'>
        {user ? <AuthHeader /> : <GenHeader />}
        <div id="account-page" className='page'>
            <h1>Account Page</h1>
            <p>In development...</p>
        </div>
        {user ? <AuthFooter /> : <GenFooter />}
    </div>
  )
}

export default Account