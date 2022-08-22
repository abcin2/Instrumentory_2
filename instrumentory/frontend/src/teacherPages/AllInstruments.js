import './InstrumentTable.css';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TiPlus } from 'react-icons/ti';

import AuthContext from '../context/AuthContext';
import AuthHeader from '../components/AuthHeader';
import GenHeader from '../components/GenHeader';
import AuthFooter from '../components/AuthFooter';
import GenFooter from '../components/GenFooter';


function AllInstruments() {

    const { user } = useContext(AuthContext);

    const [allInstruments, setAllInstruments] = useState([]);
    const [allInstrumentsForFilter, setAllInstrumentsForFilter] = useState([]);
    const [allInstrumentsForSearch, setAllInstrumentsForSearch] = useState([]);
    const [allModals, setAllModals] = useState([]);
    // may want to include default images for certain instruments at some point

    const [instrumentTypes, setInstrumentTypes] = useState([]);

    let navigate = useNavigate()

    const fetchAllInstrumentsAfterDelete = async () => {
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${user.user_id}`);
        let instrument_data = await response.json();

        setAllInstruments(instrument_data.instrument);
    }

    useEffect(() => {
        async function fetchAllInstruments() {
            let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${user.user_id}`);
            let instrument_data = await response.json();

            setAllInstruments(instrument_data.instrument);
            setAllInstrumentsForFilter(instrument_data.instrument);
            setAllInstrumentsForSearch(instrument_data.instrument);

            const modals = document.getElementsByClassName('delete-instrument-card');
            setAllModals(modals);
            // console.log(modals);
            for (let i=0; i < modals.length; i++) {
                // console.log(modals[i]);
                modals[i].style.display = "none";
            }

            // set instrument types
            let types = new Set()
            for (let inst of instrument_data.instrument) {
                types.add(inst.instrument_type)
                // it would be cool to put them in score order at some point
            }
            setInstrumentTypes(types)
        }

        fetchAllInstruments();

    }, [user.user_id])

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
            if (e.target.id === allModals[i].id.split(':')[0]) {
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

    // INSTRUMENT TYPE CHANGE
    const instrumentChange = (e) => {
        
        // this may also need to reset the search bar
        let search_bar = document.getElementById('all-search-bar')
        search_bar.value = ''
        // we would need to check for the search bar each time the filter runs
        // which I guess we COULD do
        let selected_type = e.target.value
        let filtered_instrument_list = []
        if (selected_type === 'None') {
            // should give a loading indicator here
            setAllInstruments(allInstrumentsForFilter) // always full list
            setAllInstrumentsForSearch(allInstrumentsForFilter)
        } else {
            // should give a loading indicator here as well
            for (let inst of allInstrumentsForFilter) {
                if (inst.instrument_type === selected_type) {
                    filtered_instrument_list.push(inst)
                }
            }

            setAllInstruments(filtered_instrument_list)
            setAllInstrumentsForSearch(filtered_instrument_list)

        }
    }

    // SEARCH BAR
    const searchBarChange = (e) => {

        let searchable_chars = e.target.value.toLowerCase()
        let filtered_instrument_list = []
        if (searchable_chars === '') {
            // loading indicator here
            setAllInstruments(allInstrumentsForSearch)
        } else {
            for (let inst of allInstrumentsForSearch) {
                const searchable_inst_array = [
                    inst.instrument_serial?.toLowerCase(),
                    inst.instrument_make?.toLowerCase(),
                    inst.instrument_model?.toLowerCase(),
                    inst.current_loan_info.student_first_name?.toLowerCase(),
                    inst.current_loan_info.student_last_name?.toLowerCase(),
                    inst.current_loan_info.student_email?.toLowerCase(),
                    inst.current_loan_info.parent_first_name?.toLowerCase(),
                    inst.current_loan_info.parent_last_name?.toLowerCase(),
                    inst.current_loan_info.parent_email?.toLowerCase()
                ]
                
                // eslint-disable-next-line
                const found_match = searchable_inst_array.filter(elem => {
                    if (elem?.includes(searchable_chars)) { return elem }
                })

                if (found_match.length !== 0) { filtered_instrument_list.push(inst) }
                
            }

            setAllInstruments(filtered_instrument_list)

        }
    }

  return (
    <div id="available-instruments-full-page">
        {user ? <AuthHeader /> : <GenHeader />}
        <div className="full-inventory">
            <div id="full-inventory-title-text">
                <div>
                    <h1>All Instruments</h1>
                </div>
                {/* This will need to be styled and adjusted more later */}
                <div className="filter-choices">
                    <label>Status: </label>
                    <select defaultValue={'All'} onChange={statusChange}>
                        <option value='All'>All</option>
                        <option value='Available'>Available</option>
                        <option value='Loaned'>Loaned</option>
                        <option value='Broken'>Broken</option>
                    </select>
                    <label>Instrument Type: </label> 
                    <select id="instrument-select" defaultValue={'None'} onChange={instrumentChange}>
                        <option value="None">None</option>
                        {[...instrumentTypes]?.map(type => {
                            return (
                                <option key={type} value={type}>{type}</option>
                            )
                        })}
                    </select>
                    <div className='search-bar'>
                        <input id="all-search-bar" type="text" placeholder='start typing...' onChange={searchBarChange} />
                    </div>
                </div>
            </div>
            {/* css grid for cards instead of a table */}
            <div className='inst-grid'>
                {allInstruments?.map(inst => {
                    return (
                        <div key={inst.instrument_serial} className='instrument-card-container'>
                            {/* MODAL START */}
                            <div style={{'display': 'none'}} id={inst.instrument_serial + ':modal'} className='card delete-instrument-card'>
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

export default AllInstruments