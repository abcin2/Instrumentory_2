import './Dashboard.css';
import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../context/AuthContext';
import AuthHeader from '../components/AuthHeader';
import GenHeader from '../components/GenHeader';
import AuthFooter from '../components/AuthFooter';
import GenFooter from '../components/GenFooter';

function Dashboard() {

    const { user } = useContext(AuthContext);

    const [allInstruments, setAllInstruments] = useState([]);

    const [availableLength, setAvailableLength] = useState(0);
    const [loanedLength, setLoanedLength] = useState(0);
    const [brokenLength, setBrokenLength] = useState(0);
    const [listLength, setListLength] = useState(0);


    useEffect(() => {

        const getInstruments = async () => {
            let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/instruments`);
            let data = await response.json(); // this calls EVERY instrument for EVERY user
            let instruments_for_user = []
            for (let inst of data) { // this iterates through all instruments and only allows the user to access the ones THEY have added on their account
                if (inst.user.id === user.user_id) {
                    instruments_for_user.push(inst);
                }
            }

            setAllInstruments(instruments_for_user);
            setListLength(instruments_for_user.length);
            let avail_instruments = 0
            let loaned_instruments = 0
            let broken_instruments = 0

            for (let inst of instruments_for_user) {
                if (inst.current_loan_info.student_first_name === null) {
                    avail_instruments += 1
                } else {
                    loaned_instruments += 1
                }
                if (inst.repair_info.instrument_cosmetic_issues !== '' && inst.repair_info.instrument_hardware_issues !== '') {
                    broken_instruments += 1
                }
            }
            
            setAvailableLength(avail_instruments);
            setLoanedLength(loaned_instruments);
            setBrokenLength(broken_instruments);

            // The below methods animate the color on each of the graphs
            // I hope I will eventually be able to get it to rotate in the circle

            const drawLoop = (start, percent, graph) => {
                setTimeout(() => {
                    let percentage = start.toString() + '%';
                    let incriment = percent / 100
                    graph.style.background = `linear-gradient(0deg, var(--primary-light) ${percentage}, white ${percentage})`;
                    start += incriment;
                    if (start <= percent) {
                        drawLoop(start, percent, graph);
                    }
                }, 5)
            }

            const animateAvailGraph = (avail, total) => {
                // const full_circle = 360
                const graph = document.getElementById('available-graph');
                let percentage_int = avail/total * 100
                let start = 0
                drawLoop(start, percentage_int, graph);
            }

            const animateLoanedGraph = (loaned, total) => {
                const graph = document.getElementById('loaned-graph');
                let percentage_int = loaned/total * 100
                let start = 0
                drawLoop(start, percentage_int, graph);
            }

            const animateBrokenGraph = (broken, total) => {
                const graph = document.getElementById('broken-graph');
                let percentage_int = broken/total * 100
                let start = 0
                drawLoop(start, percentage_int, graph);
            }

            animateAvailGraph(avail_instruments, instruments_for_user.length);
            animateLoanedGraph(loaned_instruments, instruments_for_user.length);
            animateBrokenGraph(broken_instruments, instruments_for_user.length);

        }

        getInstruments();
        console.log('data retrieved');

    }, [user.user_id])

  return (
    <div id="dashboard-full-page">
        {user ? <AuthHeader /> : <GenHeader />}
        <div className="page">
            <h1>Your Dashboard</h1>
            <div className="card dashboard-graphs">
                <div className="circle-graphs">
                    <div className="graph-link">
                        <a id="available-graph" className="graph" href="/available_instruments/"><div id="available-canvas"><p className='graph-text'>{ availableLength }/{ listLength }</p></div></a>
                        <p>Available Instruments</p>
                    </div>
                    <div className="graph-link">
                        <a id="loaned-graph" className="graph" href="/loaned_instruments/"><div id="loaned-canvas"><p className='graph-text'>{ loanedLength }/{ listLength }</p></div></a>
                        <p>Loaned Instruments</p>
                    </div>
                    <div className="graph-link">
                        <a id="broken-graph" className="graph" href="/broken_instruments/"><div id="broken-canvas"><p className='graph-text'>{ brokenLength }/{ listLength }</p></div></a>
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