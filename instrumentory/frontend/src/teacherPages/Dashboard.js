import './Dashboard.css';
import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../context/AuthContext';
import AuthHeader from '../components/AuthHeader';
import GenHeader from '../components/GenHeader';
import AuthFooter from '../components/AuthFooter';
import GenFooter from '../components/GenFooter';
import { GiZBrick } from 'react-icons/gi';

function Dashboard() {

    const { user } = useContext(AuthContext);

    const [allInstruments, setAllInstruments] = useState([]);

    const [availableLength, setAvailableLength] = useState(0);
    const [loanedLength, setLoanedLength] = useState(0);
    const [brokenLength, setBrokenLength] = useState(0);
    const [listLength, setListLength] = useState(0);


    useEffect(() => {
        const getInstruments = async () => {
            let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/instruments/`);
            let data = await response.json();
            setAllInstruments(data);
            setListLength(data.length);
            let avail_instruments = 0
            let loaned_instruments = 0
            let broken_length = 0
            for (let inst of data) {
                if (inst.current_loan_info.student_first_name === null) {
                    avail_instruments += 1
                } else {
                    loaned_instruments += 1
                }
                if (inst.repair_info.instrument_cosmetic_issues != '' && inst.repair_info.instrument_hardware_issues != '') {
                    broken_length += 1
                }
            }
            setAvailableLength(avail_instruments);
            setLoanedLength(loaned_instruments);
            setBrokenLength(broken_length);
        }
        getInstruments();
        console.log('data retrieved');
    }, [])

  return (
    <div id="dashboard-full-page">
        {user ? <AuthHeader /> : <GenHeader />}
        <div className="page">
            <h1>Your Dashboard</h1>
            <div className="card dashboard-graphs">
                <div className="circle-graphs">
                    <div className="graph-link">
                        <a className="graph" href="/available_instruments/"><div id="available-canvas"><p className='graph-text'>{ availableLength }/{ listLength }</p></div></a>
                        <p>Available Instruments</p>
                    </div>
                    <div className="graph-link">
                        <a className="graph" href="/loaned_instruments/"><div id="loaned-canvas"><p className='graph-text'>{ loanedLength }/{ listLength }</p></div></a>
                        <p>Loaned Instruments</p>
                    </div>
                    <div className="graph-link">
                        <a className="graph" href="/broken_instruments/"><div id="broken-canvas"><p className='graph-text'>{ brokenLength }/{ listLength }</p></div></a>
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