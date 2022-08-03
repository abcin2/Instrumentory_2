import './InstrumentTable.css';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { TiPlus } from 'react-icons/ti';

import AuthContext from '../context/AuthContext';
import AuthHeader from '../components/AuthHeader';
import GenHeader from '../components/GenHeader';
import AuthFooter from '../components/AuthFooter';
import GenFooter from '../components/GenFooter';


function LoanedInstruments() {

    const { user } = useContext(AuthContext);

    const [loanedInstruments, setLoanedInstruments] = useState([]);
    const [allModals, setAllModals] = useState([]);

    let navigate = useNavigate()

    const fetchAllInstrumentsAfterDelete = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${user.user_id}`);
        let instrument_data = await response.json();

        setLoanedInstruments(instrument_data.instrument);
    }

    useEffect(() => {
        async function fetchLoanedInstruments() {
            let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${user.user_id}`);
            let instrument_data = await response.json();

            let loaned_instruments = [];
            for (let inst of instrument_data.instrument) {
                if (inst.current_loan_info.loan_start !== null) {
                    loaned_instruments.push(inst);
                }
            }

            setLoanedInstruments(loaned_instruments);

            const modals = document.getElementsByClassName('delete-instrument-card');
            setAllModals(modals);
            // console.log(modals);
            for (let i=0; i < modals.length; i++) {
                // console.log(modals[i]);
                modals[i].style.display = "none";
            }
        }

        fetchLoanedInstruments();

    }, [])

    const addInstrumentView = () => {
        navigate('/add_instrument/');
    }

    const showModal = (e) => {
        // console.log(e.target.id);
        for (let i=0; i < allModals.length; i++) {
            // console.log(allInstruments[i].id);
            // eslint-disable-next-line
            if (allInstruments[i].id == (e.target.id)) {
                allModals[i].style.display = "block";
                // console.log(allModals[i].display) // will need to find a way to animate this
            }
            // console.log(allModals[i].id.split(':')[0]); // serial # for each inst
        }
    }

    const hideModal = (e) => {
        // console.log(e.target.id);
        for (let i=0; i < allModals.length; i++) {
            if (e.target.id == allModals[i].id.split(':')[0]) {
                allModals[i].style.display = "none";
            }
        }
    }

    const deleteInstrument = async (e) => {
        const inst_id = e.target.id.split(':')[0];
        // eslint-disable-next-line
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/instruments/${inst_id}/delete/`, {
            method: 'DELETE'
        });
        // refresh page
        // window.location.reload(false);
        fetchAllInstrumentsAfterDelete();
    }
    
    // STATUS CHANGE
    const statusChange = (e) => {
        let selected_status = e.target.value;
        if (selected_status === 'Available') {
            navigate('/available_instruments/');
        } else if (selected_status === 'Loaned') {
            navigate('/loaned_instruments/');
        } else if (selected_status === 'Broken') {
            navigate('/broken_instruments/');
        } else if (selected_status === 'All') {
            navigate('/full_inventory/');
        }
    }
    
  return (
    <div id="available-instruments-full-page">
        {user ? <AuthHeader /> : <GenHeader />}
        <div className="full-inventory">
        <div id="full-inventory-title-text">
                <div>
                    <h1>Loaned Instruments</h1>
                </div>
                {/* This will need to be styled and adjusted more later */}
                <div className="filter-choices">
                    <label>Status</label>
                    <select onChange={statusChange}>
                        <option>All</option>
                        <option>Available</option>
                        <option selected>Loaned</option>
                        <option>Broken</option>
                    </select>
                    <label>Search Bar</label>
                    <input type="text" />
                    <label>Instrument Type</label>
                    <label>Order By</label>
                    <button className="go">Go</button>
                </div>
            </div>
            {/* css grid for cards instead of a table */}
            <div className='inst-grid'>
                {loanedInstruments?.map(inst => {
                    return (
                        <div key={inst.instrument_serial} className='instrument-card-container'>
                            {/* MODAL START */}
                            <div id={inst.instrument_serial + ':modal'} className='card delete-instrument-card'>
                                <div>Are you sure you would like to delete instrument:</div>
                                <div id="inst-type-and-serial">{inst.instrument_type}: {inst.instrument_serial}</div>
                                <div className="modal-buttons">
                                    <button id={inst.id + ':delbutton'} className='button-success' onClick={deleteInstrument}>Yes, I'm sure</button>
                                    <button id={inst.instrument_serial} className='button-danger' onClick={hideModal}>On second thought...</button>
                                </div>
                            </div>
                            {/* MODAL END */}
                            <div className='instrument-card'>
                                <h1>{inst.instrument_type}</h1>
                                <div className='image-container'>
                                    <img 
                                    className='instrument-image' 
                                    src={inst.instrument_image === null || inst.instrument_image.slice(-9) === 'undefined' ? 'https://intersections.humanities.ufl.edu/files/112815904-stock-vector-no-image-available-icon-flat-vector-illustration-1.jpg' : inst.instrument_image} 
                                    alt={inst.instrument_type + ' with serial number: ' + inst.instrument_serial}
                                    />
                                </div>
                                <h2>{inst.instrument_serial}</h2>
                                <button className='button-primary button-small details-button' onClick={() => {navigate(`/update_instrument/${inst.id}/`)}}>Details</button>
                                <button id={inst.id} className='button-danger button-small delete-button' onClick={showModal}>Delete</button>
                            </div>
                        </div>
                    )
                })}
                <div onClick={addInstrumentView} id="add-instrument-card">
                    <h1>Add instrument</h1>
                    <TiPlus id="plus-sign" size={40} />
                </div>
            </div>
        </div>
        {user ? <AuthFooter /> : <GenFooter />}
    </div>
  )
}

export default LoanedInstruments