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

    useEffect(() => {
        async function fetchLoanedInstruments() {
            let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/instruments/`);
            let instrument_data = await response.json();
            setLoanedInstruments(instrument_data);
        }
        fetchLoanedInstruments();
    }, [])

    let navigate = useNavigate()

    const addInstrumentView = () => {
        navigate('/add_instrument/');
    }

  return (
    <div id="available-instruments-full-page">
        {user ? <AuthHeader /> : <GenHeader />}
        <div className="full-inventory">
            <div id="full-inventory-title-text">
                <div>
                    <h1>Loaned Instruments</h1>
                </div>
                {/* <div className="filter-choices">
                    <form method="get">
                        <label>Search Bar</label>
                        <input type="text" />
                        <label>Instrument Type</label>
                        <label>Order By</label>
                        <button className="go" type="submit">Go</button>
                    </form>
                </div> */}
            </div>
            {/* css grid for cards instead of a table */}
            <div className='inst-grid'>
                {/* <div id="add-instrument-card" className='instrument-card'>
                    <h1>Add instrument</h1>
                    <TiPlus id="plus-sign" size={40} />
                </div> */}
                {/* ^^^ NOT SURE I WANT THIS ONE AT THE BEGINNING SINCE THERE IS A NAVBAR OPTION TO ADD AN INSTRUMENT ^^^ */}
                {loanedInstruments.map(inst => {
                    return (
                        <div key={inst.instrument_serial} className='instrument-card'>
                            <h1>{inst.instrument_type}</h1>
                            <div className='image-container'>
                                <img 
                                className='instrument-image' 
                                src={inst.instrument_image == null ? 'https://intersections.humanities.ufl.edu/files/112815904-stock-vector-no-image-available-icon-flat-vector-illustration-1.jpg' : inst.instrument_image} 
                                alt={inst.instrument_type + ' with serial number: ' + inst.instrument_serial}
                                />
                            </div>
                            <h2>{inst.instrument_serial}</h2>
                            <button className='button-primary button-small details-button'>Details</button>
                            <button className='button-danger button-small delete-button'>Delete</button>
                            {/* <div className="delete-details-buttons">
                                <button className='button-primary button-small'>Details</button>
                                <button className='button-danger button-small'>Delete</button>
                            </div> */}
                            {/* need delete and details buttons */}
                        </div>
                    )
                })}
                <div onClick={addInstrumentView} id="add-instrument-card">
                    <h1>Add instrument</h1>
                    <TiPlus id="plus-sign" size={40} />
                </div>
            </div>
            {/* MODAL START */}
            {/* will need to create some dynamic javascript to show and hide this modal */}
            <div style={{'display': 'none'}} onclick="closeModal(this.id)" id="modal-{{ inst.instrument_serial }}" className="modal">
                <div onclick="checkModal()" className="modal-content" id="modal_content-{{ inst.instrument_serial }}">
                    <span onclick="closeModal(this.id)" id="close-{{ inst.instrument_serial }}" className="close">&times;</span>
                    <form action="" className="confirm" method="POST">
                        {/* csrf_token */}
                        <p>Are you sure you would like to delete this instrument?</p>
                        <h3>Instrument_Type: Instrument_Serial</h3>
                        <p>You will not be able to undo this action.</p>
                        <input type="hidden" value="{{ inst.id }}" name="id" />
                        <input type="submit" value="Yes, I'm sure" name="delete" className="confirmBtn" />
                        <button onclick="closeModal(this.id)" id="cancel-{{ inst.instrument_serial }}" className="closeBtn">On second thought...</button>
                    </form>
                </div>
            </div>
            {/* MODAL END */}
        </div>
        {user ? <AuthFooter /> : <GenFooter />}
    </div>
  )
}

export default LoanedInstruments