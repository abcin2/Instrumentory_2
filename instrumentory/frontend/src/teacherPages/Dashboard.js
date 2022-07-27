import './Dashboard.css';
import React, { useState, useContext } from 'react';

import AuthContext from '../context/AuthContext';
import AuthHeader from '../components/AuthHeader';
import GenHeader from '../components/GenHeader';
import AuthFooter from '../components/AuthFooter';
import GenFooter from '../components/GenFooter';

function Dashboard() {

    const { user } = useContext(AuthContext);

    const [availableLength, setAvailableLength] = useState(0);
    const [loanedLength, setLoanedLength] = useState(0);
    const [brokenLength, setBrokenLength] = useState(0);
    const [listLength, setListLength] = useState(0);


  return (
    <div id="dashboard-full-page">
        {user ? <AuthHeader /> : <GenHeader />}
        <div className="page">
            <h1>Your Dashboard</h1>
            <div className="card dashboard-graphs">
                <div className="circle-graphs">
                    <div className="graph-link">
                        <a className="graph" href="/available_instruments/"><div className="graph"><canvas height="240" width="240" id="available-canvas">{ availableLength }/{ listLength }</canvas></div></a>
                        <p>Available Instruments</p>
                    </div>
                    <div className="graph-link">
                        <a className="graph" href="/loaned_instruments/"><div className="graph"><canvas height="240" width="240" id="loaned-canvas">{ loanedLength }/{ listLength }</canvas></div></a>
                        <p>Loaned Instruments</p>
                    </div>
                    <div className="graph-link">
                        <a className="graph" href="/broken_instruments/"><div className="graph"><canvas height="240" width="240" id="broken-canvas">{ brokenLength }/{ listLength }</canvas></div></a>
                        <p>Broken Instruments</p>
                    </div>
                </div>
            </div>
        </div>
        {user ? <AuthFooter /> : <GenFooter />}
    </div>
  )
}

export default Dashboard