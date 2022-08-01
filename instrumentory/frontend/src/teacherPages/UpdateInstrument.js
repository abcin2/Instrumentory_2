import './AddInstrument.css'
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import AuthContext from '../context/AuthContext';
import AuthHeader from '../components/AuthHeader';
import GenHeader from '../components/GenHeader';
import AuthFooter from '../components/AuthFooter';
import GenFooter from '../components/GenFooter';
import Modal from '../components/Modal';

// import AutoComplete from '../components/AutoComplete';

function UpdateInstrument() { // will probably need to add every state variable to populate form

    const { user } = useContext(AuthContext);
    const { id } = useParams() // gets id from url

    // for Forms
    const [disabled, setDisabled] = useState(false);
    const [editedInstrumentFormDisabled, setEditedInstrumentFormDisabled] = useState(true);
    const [editedLoanFormDisabled, setEditedLoanFormDisabled] = useState(true);
    const [editedRepairFormDisabled, setEditedRepairFormDisabled] = useState(true);

    // instrument info
    const [instrumentType, setInstrumentType] = useState('');
    const [instrumentMake, setInstrumentMake] = useState('');
    const [instrumentModel, setInstrumentModel] = useState('');
    const [instrumentSerial, setInstrumentSerial] = useState('');
    const [instrumentImage, setInstrumentImage] = useState('');

    // accessories
    const [mouthpiece, setMouthpiece] = useState(false);
    const [ligature, setLigature] = useState(false);
    const [slideGrease, setSlideGrease] = useState(false);
    const [corkGrease, setCorkGrease] = useState(false);
    const [slideOil, setSlideOil] = useState(false);
    const [valveOil, setValveOil] = useState(false);
    const [reeds, setReeds] = useState(false);
    const [neckStrap, setNeckStrap] = useState(false);
    const [swab, setSwab] = useState(false);

    // loan info
    const [loanInfo, setLoanInfo] = useState([]);
    const [studentFirstName, setStudentFirstName] = useState('');
    const [studentLastName, setStudentLastName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [parentFirstName, setParentFirstName] = useState('');
    const [parentLastName, setParentLastName] = useState('');
    const [parentEmail, setParentEmail] = useState('');
    const [parentPhone, setParentPhone] = useState('');
    const [loanStart, setLoanStart] = useState('');
    const [loanEnd, setLoanEnd] = useState('');
    const [contractAccepted, setContractAccepted] = useState(false);

    // repair info
    const [repairInfo, setRepairInfo] = useState([]);
    const [cosmeticIssues, setCosmeticIssues] = useState(null);
    const [hardwareIssues, setHardwareIssues] = useState(null);

    // modal object
    const [modalDisplayOne, setModalDisplayOne] = useState('none');
    const [modalDisplayTwo, setModalDisplayTwo] = useState('none');

    const modal_data_one = {
        display: modalDisplayOne,
        headerText: 'Are you sure?',
        bodyText: 'Returning this instrument will archive the current information and replace it with a blank form. You currently do not have a loan return date. Would you like to archive anyway?',
        button1: "Yes, I'm sure",
        button2: "On second thought...",
        button1Click: () => {archiveLoanInfo()},
        button2Click: () => {setModalDisplayOne('none')}
    }

    const modal_data_two = {
        display: modalDisplayTwo,
        headerText: 'Are you sure?',
        bodyText: 'Returning this instrument will archive the current information and replace it with a blank form. You cannot undo this action. Would you like to archive?',
        button1: "Yes, I'm sure",
        button2: "On second thought...",
        button1Click: () => {archiveLoanInfo()},
        button2Click: () => {setModalDisplayTwo('none')}
    }

    /* REFs */
    const backgroundOne = useRef()
    const closeButtonOne = useRef()
    const backgroundTwo = useRef()
    const closeButtonTwo = useRef()

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (e.target === backgroundOne.current || 
                e.target === closeButtonOne.current ||
                e.target === backgroundTwo.current ||
                e.target === closeButtonTwo.current) {
                setModalDisplayOne('none');
                setModalDisplayTwo('none');
            }
        })
    }, [])


    useEffect(() => {
        const getInstrument = async () => {
            let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/instruments/${id}`); // this is called from api/urls.py
            let data = await response.json()
            // console.log(data)
            // Instrument Data
            setInstrumentType(data.instrument_type);
            document.getElementById('instrument-type').value = data.instrument_type;
            setInstrumentMake(data.instrument_make);
            document.getElementById('instrument-make').value = data.instrument_make;
            setInstrumentModel(data.instrument_model);
            document.getElementById('instrument-model').value = data.instrument_model;
            setInstrumentSerial(data.instrument_serial);
            document.getElementById('instrument-serial').value = data.instrument_serial;
            setInstrumentImage(null); // needs to change to conditional until I figure out the image issue
            document.getElementById('instrument-image').value = null;
            // Accessories Data
            setMouthpiece(data.accessories.instrument_mouthpiece);
            document.getElementById('mouthpiece').checked = data.accessories.instrument_mouthpiece;
            setLigature(data.accessories.instrument_ligature);
            document.getElementById('ligature').checked = data.accessories.instrument_ligature;
            setSlideGrease(data.accessories.instrument_slide_grease);
            document.getElementById('slide-grease').checked = data.accessories.instrument_slide_grease;
            setCorkGrease(data.accessories.instrument_cork_grease);
            document.getElementById('cork-grease').checked = data.accessories.instrument_cork_grease;
            setSlideOil(data.accessories.instrument_slide_oil);
            document.getElementById('slide-oil').checked = data.accessories.instrument_slide_oil;
            setValveOil(data.accessories.instrument_valve_oil);
            document.getElementById('valve-oil').checked = data.accessories.instrument_valve_oil;
            setReeds(data.accessories.instrument_reeds);
            document.getElementById('reeds').checked = data.accessories.instrument_reeds;
            setNeckStrap(data.accessories.instrument_neck_strap);
            document.getElementById('neck-strap').checked = data.accessories.instrument_neck_strap;
            setSwab(data.accessories.instrument_swab);
            document.getElementById('swab').checked = data.accessories.instrument_swab;
            // Loan Info
            setLoanInfo(data.current_loan_info);
            setStudentFirstName(data.current_loan_info.student_first_name);
            document.getElementById('student_first_name').value = data.current_loan_info.student_first_name;
            setStudentLastName(data.current_loan_info.student_last_name);
            document.getElementById('student_last_name').value = data.current_loan_info.student_last_name;
            setStudentEmail(data.current_loan_info.student_email);
            document.getElementById('student_email').value = data.current_loan_info.student_email;
            setParentFirstName(data.current_loan_info.parent_first_name);
            document.getElementById('parent_first_name').value = data.current_loan_info.parent_first_name;
            setParentLastName(data.current_loan_info.parent_last_name);
            document.getElementById('parent_last_name').value = data.current_loan_info.parent_last_name;
            setParentEmail(data.current_loan_info.parent_email);
            document.getElementById('parent_email').value = data.current_loan_info.parent_email;
            setParentPhone(data.current_loan_info.parent_phone);
            document.getElementById('parent_phone').value = data.current_loan_info.parent_phone;
            setLoanStart(data.current_loan_info.loan_start);
            document.getElementById('loan_start_date').value = data.current_loan_info.loan_start;
            setLoanEnd(data.current_loan_info.loan_end);
            document.getElementById('loan_end_date').value = data.current_loan_info.loan_end;
            setContractAccepted(data.current_loan_info.accept_contract);
            document.getElementById('contract').checked = data.current_loan_info.accept_contract;
            // Repair Data
            if (data.repair_info) {
                setRepairInfo(data.repair_info);
                document.getElementById('cosmetic-issues').value = data.repair_info.instrument_cosmetic_issues;
                setCosmeticIssues(data.repair_info.instrument_cosmetic_issues);
                document.getElementById('hardware-issues').value = data.repair_info.instrument_hardware_issues;
                setHardwareIssues(data.repair_info.instrument_hardware_issues);
            }
        }
        getInstrument();
        console.log('data retrieved')
    }, [id])

    // console.log(process.env.REACT_APP_DATABASE_HOST)
    // console.log(document.getElementById('contract').checked)
    // I could dynamically change the checkbox options depending on what instrument is selected.
    // I could remove the options for accessories for instruments that are not currently in the database.
    // These could be added later if/when they are needed.

    const updateInstrument = async (e) => {
        e.preventDefault()
        setDisabled(true)

        var data = new FormData()
        
        data.append('instrument_image', instrumentImage)
        data.append('instrument_type', instrumentType)
        data.append('instrument_serial', instrumentSerial)
        data.append('instrument_make', instrumentMake)
        data.append('instrument_model', instrumentModel)
        data.append('user', user.username)
        // accessories
        data.append('instrument_mouthpiece', mouthpiece)
        data.append('instrument_slide_grease', slideGrease)
        data.append('instrument_slide_oil', slideOil)
        data.append('instrument_valve_oil', valveOil)
        data.append('instrument_ligature', ligature)
        data.append('instrument_reeds', reeds)
        data.append('instrument_cork_grease', corkGrease)
        data.append('instrument_neck_strap', neckStrap)
        data.append('instrument_swab', swab)
        // still need to check and log errors for blank inputs
        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/instruments/${id}/update/`, {
            method: 'PUT',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: data
        })
        let instrument_instance = await response.json()
        console.log(instrument_instance);
        if (response.ok) {
            // success message pops up with instrument
            console.log('All fields populated');
            let fieldset_inputs = document.getElementById('fieldset-inputs');
            let add_instrument_submit_button = document.getElementById('add-instrument-submit-button');

            fieldset_inputs.disabled = true
            add_instrument_submit_button.innerHTML = 'Edit Instrument'
            setEditedInstrumentFormDisabled(true);
            setDisabled(false);
        } else {
            alert('Oops! Something went wrong!')
        }
    }

    // eslint-disable-next-line
    const updateLoanInfo = async (e) => {
        e.preventDefault();
        setDisabled(true)

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/loan_info/${id}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': id,
                'student_first_name': studentFirstName,
                'student_last_name': studentLastName,
                'student_email': studentEmail,
                'parent_first_name': parentFirstName,
                'parent_last_name': parentLastName,
                'parent_email': parentEmail,
                'parent_phone': parentPhone,
                'loan_start': loanStart,
                'loan_end': loanEnd,
                'accept_contract': contractAccepted
            })
        })
        if (response.ok) {
            console.log('Loan Info updated successfully!');
            let fieldset_inputs = document.getElementById('loan-fieldset-inputs');
            let update_loan_info_button = document.getElementById('update-loan-info-button');

            fieldset_inputs.disabled = true;
            update_loan_info_button.innerHTML = 'Edit Loan Info';
            setEditedLoanFormDisabled(true);
            setDisabled(false);
        } else {
            console.log(response);
        }
    }

    const archiveLoanInfo = async (e) => {
        setDisabled(true);

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/loan_info/${id}/archive/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': id,
                'student_first_name': studentFirstName,
                'student_last_name': studentLastName,
                'student_email': studentEmail,
                'parent_first_name': parentFirstName,
                'parent_last_name': parentLastName,
                'parent_email': parentEmail,
                'parent_phone': parentPhone,
                'loan_start': loanStart,
                'loan_end': loanEnd,
                'accept_contract': contractAccepted
            })
        })
        if (response.ok) {
            console.log('Loan Info archived successfully!');
            let fieldset_inputs = document.getElementById('loan-fieldset-inputs');
            let update_loan_info_button = document.getElementById('update-loan-info-button');
            let loan_info_form = document.getElementById('form-loan-info');

            fieldset_inputs.disabled = true;
            update_loan_info_button.innerHTML = 'Edit Loan Info';
            setEditedLoanFormDisabled(true);
            setDisabled(false);
            // clear values in form, because python view, removes the info from the db
            setStudentFirstName('');
            setStudentLastName('');
            setStudentEmail('');
            setParentFirstName('');
            setParentLastName('');
            setParentEmail('');
            setParentPhone('');
            setLoanStart('');
            setLoanEnd('');
            setContractAccepted('');
            loan_info_form.reset()
            setModalDisplayOne('none');
            setModalDisplayTwo('none');
        } else {
            console.log(response);
        }
    }

    const updateRepairInfo = async (e) => {
        e.preventDefault()
        setDisabled(true)

        let response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/repair_info/${id}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': id,
                'cosmetic_issues': cosmeticIssues,
                'hardware_issues': hardwareIssues
            })
        })
        if (response.ok) {
            console.log('Repair Info updated successfully!')
            let fieldset_inputs = document.getElementById('repair-fieldset-inputs');
            let update_repair_info_button = document.getElementById('update-repair-info-button');

            fieldset_inputs.disabled = true;
            update_repair_info_button.innerHTML = 'Edit Repair Info';
            setEditedRepairFormDisabled(true);
            setDisabled(false)
        } else {
            console.log(response);
        }
    }

    const showEditInstrumentForm = (e) => {
        e.preventDefault();
        let fieldset_inputs = document.getElementById('fieldset-inputs');
        let add_instrument_submit_button = document.getElementById('add-instrument-submit-button');

        fieldset_inputs.disabled = false;
        add_instrument_submit_button.innerHTML = 'Submit Changes';
        setEditedInstrumentFormDisabled(false);
    }

    const showEditLoanForm = (e) => {
        e.preventDefault();
        let fieldset_inputs = document.getElementById('loan-fieldset-inputs');
        let update_loan_info_button = document.getElementById('update-loan-info-button');

        fieldset_inputs.disabled = false;
        update_loan_info_button.innerHTML = 'Submit Changes';
        setEditedLoanFormDisabled(false);
    }

    const showEditRepairForm = (e) => {
        e.preventDefault();
        // ALL OF THESE ELEMENTS ARE NOT DEFINED BECAUSE THEY DON"T EXIST
        // IT MAY BE BETTER TO SET THE FIELDSET INPUTS TO DISPLAY NONE AND THEN DISPLAY BLOCK WHEN THE BUTTON IS CLICKED
        let fieldset_inputs = document.getElementById('repair-fieldset-inputs');
        let update_repair_info_button = document.getElementById('update-repair-info-button');

        fieldset_inputs.disabled = false;
        update_repair_info_button.innerHTML = 'Submit Changes';
        setEditedRepairFormDisabled(false);
    }

  return (
    <div id="add-instrument-full-page">
        {user ? <AuthHeader /> : <GenHeader />}
        <div className='page'>
            <Modal 
            display={modal_data_one.display}
            headerText={modal_data_one.headerText}
            bodyText={modal_data_one.bodyText}
            button1={modal_data_one.button1}
            button2={modal_data_one.button2}
            button1Click={modal_data_one.button1Click}
            button2Click={modal_data_one.button2Click}
            backgroundRef={backgroundOne}
            closeButtonRef={closeButtonOne}
            />
            <Modal 
            display={modal_data_two.display}
            headerText={modal_data_two.headerText}
            bodyText={modal_data_two.bodyText}
            button1={modal_data_two.button1}
            button2={modal_data_two.button2}
            button1Click={modal_data_two.button1Click}
            button2Click={modal_data_two.button2Click}
            backgroundRef={backgroundTwo}
            closeButtonRef={closeButtonTwo}
            />
            <div id="add-instrument-header">
                <h1>Update {instrumentType}: {instrumentSerial}</h1>
            </div>
            {/* INSTRUMENT */}
            <div id="instrument">
                <div id="instrument-info">
                    <div id="disabled-instrument-form" className='card'> {/* NEED TO REMOVE 'DISPLAY-NONE' WHEN DONE */}
                        <form id="instrument-form" onSubmit={updateInstrument}>
                            <fieldset id="fieldset-inputs" disabled>
                                <div id="instrument-type-input">
                                    <input id="instrument-type" className='input-text login-input' type="text" placeholder='Instrument Type' onChange={e => setInstrumentType(e.target.value)} />
                                    <input id="instrument-make" className='input-text login-input' type="text" placeholder='Make' onChange={e => setInstrumentMake(e.target.value)} />
                                    <input id="instrument-model" className='input-text login-input' type="text" placeholder='Model' onChange={e => setInstrumentModel(e.target.value)} />
                                    <input id="instrument-serial" className='input-text login-input' type="text" placeholder='Serial' onChange={e => setInstrumentSerial(e.target.value)} />
                                </div>
                                <div id="instrument-image-input" className='input-text login-input'>
                                    <div id="file-chosen-text">
                                        {instrumentImage ? 'Image Selected!' : 'Select Image'}
                                    </div>
                                    <input id="instrument-image" className='image-input' type="file" onChange={e => setInstrumentImage(e.target.files[0])} />
                                </div>
                                <div id="instrument-accessories-input">
                                    <div className="checkbox-and-label">
                                        <input id="mouthpiece" type="checkbox" name="mouthpiece" value="mouthpiece" onChange={e => setMouthpiece(e.target.checked)} />
                                        <label htmlFor="mouthpiece">Mouthpiece</label> 
                                    </div>
                                    <div className="checkbox-and-label">
                                        <input id="ligature" type="checkbox" name="ligature" value="ligature" onChange={e => setLigature(e.target.checked)} />
                                        <label htmlFor="ligature">Ligature</label> 
                                    </div>
                                    <div className="checkbox-and-label">
                                        <input id="slide-grease" type="checkbox" name="slide-grease" value="slide-grease" onChange={e => setSlideGrease(e.target.checked)} />
                                        <label htmlFor="slide-grease">Slide Grease</label> 
                                    </div>
                                    <div className="checkbox-and-label">
                                        <input id="cork-grease" type="checkbox" name="cork-grease" value="cork-grease" onChange={e => setCorkGrease(e.target.checked)} />
                                        <label htmlFor="cork-grease">Cork Grease</label> 
                                    </div>
                                    <div className="checkbox-and-label">
                                        <input id="slide-oil" type="checkbox" name="slide-oil" value="slide-oil" onChange={e => setSlideOil(e.target.checked)} />
                                        <label htmlFor="slide-oil">Slide Oil</label> 
                                    </div>
                                    <div className="checkbox-and-label">
                                        <input id="valve-oil" type="checkbox" name="valve-oil" value="valve-oil" onChange={e => setValveOil(e.target.checked)} />
                                        <label htmlFor="valve-oil">Valve Oil</label> 
                                    </div>
                                    <div className="checkbox-and-label">
                                        <input id="reeds" type="checkbox" name="reeds" value="reeds" onChange={e => setReeds(e.target.checked)} />
                                        <label htmlFor="reeds">Reeds</label> 
                                    </div>
                                    <div className="checkbox-and-label">
                                        <input id="neck-strap" type="checkbox" name="neck-strap" value="neck-strap" onChange={e => setNeckStrap(e.target.checked)} />
                                        <label htmlFor="neck-strap">Neck Strap</label> 
                                    </div>
                                    <div className="checkbox-and-label">
                                        <input id="swab" type="checkbox" name="swab" value="swab" onChange={e => setSwab(e.target.checked)} />
                                        <label htmlFor="swab">Swab</label>
                                    </div>
                                </div>
                            </fieldset>
                            <div id="add-instrument-submit-div"> {/* NEED TO CHANGE BUTTONS */}
                                <button disabled={disabled} id="add-instrument-submit-button" className='button-success' onClick={editedInstrumentFormDisabled ? showEditInstrumentForm : updateInstrument}>Edit Instrument</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* LOAN INFO */}
            <div id="all-loan-info">
                <div id="loan-info-form" className='card'> {/* DISPLAY WHEN BUTTON IS CLICKED */}
                    <form id="form-loan-info" onSubmit={updateLoanInfo}>
                        <fieldset id="loan-fieldset-inputs" disabled>
                            <input id="student_first_name" type="text" className='input-text login-input loan-input' placeholder='Student First Name' onChange={e => setStudentFirstName(e.target.value)}/>
                            <input id="student_last_name" type="text" className='input-text login-input loan-input' placeholder='Student Last Name' onChange={e => setStudentLastName(e.target.value)}/>
                            <input id="student_email" type="email" className='input-text login-input loan-input' placeholder='Student Email' onChange={e => setStudentEmail(e.target.value)}/>
                            <input id="parent_first_name" type="text" className='input-text login-input loan-input' placeholder='Parent First Name' onChange={e => setParentFirstName(e.target.value)}/>
                            <input id="parent_last_name" type="text" className='input-text login-input loan-input' placeholder='Parent Last Name' onChange={e => setParentLastName(e.target.value)}/>
                            <input id="parent_email" type="email" className='input-text login-input loan-input' placeholder='Parent Email' onChange={e => setParentEmail(e.target.value)}/>
                            <input id="parent_phone" type="phone" className='input-text login-input loan-input' placeholder='Parent Phone Number' onChange={e => setParentPhone(e.target.value)}/>
                            <input id="loan_start_date" type="date" className='input-text login-input loan-input' placeholder='Loan Start Date' onChange={e => setLoanStart(e.target.value)}/>
                            <input id="loan_end_date" type="date" className='input-text login-input loan-input' placeholder='Loan End Date' onChange={e => setLoanEnd(e.target.value)}/>
                            <div id="instrument-contract-input">
                            <div className="checkbox-and-label">
                                <input id="contract" type="checkbox" name="contract" value="contract" onChange={e => setContractAccepted(e.target.checked)}/>
                                <label htmlFor="contract">Contract Accepted?</label>
                            </div>
                            </div>
                        </fieldset>
                        <div id="loan-info-archive-div">
                            <button disabled={loanStart ? disabled : true} id="return-instrument-button" className='button button-primary' onClick={() => {loanEnd ? setModalDisplayTwo('block') : setModalDisplayOne('block')}}>Return Instrument</button>
                        </div>
                        <div id='loan-info-submit-div'>
                            <button disabled={disabled} id="update-loan-info-button" className='button button-success' onClick={editedLoanFormDisabled ? showEditLoanForm : updateLoanInfo}>Update Loan Info</button>
                        </div>
                    </form>
                </div>
                {/* THIS IS DISABLED FOR NOW, MY PLAN IS TO MAKE THIS WORK BETTER WHEN THERE IS NO DATA ENTERED -- NOT A PRIORITY */}
                <div id="loan-info-button" className='card' style={{'display': 'none'}}> {/* DISPLAY 'EDIT' or 'CREATE' */}
                    <button id="loan-info-submit-button" className='button button-primary'>Loan to Student</button>
                </div>
            </div>
            {/* REPAIR INFO */}
            <div id="all-repair-info">
                {/* Eventually will want the DOM to show "add info" if there is nothing */}
                <div id="repair-info-form" className='card'>
                    <form onSubmit={updateRepairInfo}>
                        <fieldset id="repair-fieldset-inputs" disabled>
                            <label htmlFor="cosmetic-issues">Cosemtic Issues</label>
                            <textarea id="cosmetic-issues" onChange={e => setCosmeticIssues(e.target.value)}/>
                            <label htmlFor="hardware-issues">Hardware Issues</label>
                            <textarea id="hardware-issues" onChange={e => setHardwareIssues(e.target.value)}/>
                        </fieldset>
                        <div id='repair-info-submit-div'>
                            <button disabled={disabled} id="update-repair-info-button" className='button button-success' onClick={editedRepairFormDisabled ? showEditRepairForm : updateRepairInfo}>Update Repair Info</button>
                        </div>
                    </form>
                </div>
                {/* THIS IS DISABLED FOR NOW, MY PLAN IS TO MAKE THIS WORK BETTER WHEN THERE IS NO DATA ENTERED -- NOT A PRIORITY */}
                <div id="repair-info-button" className='card' style={{"display": "none"}}>
                    <button id="repair-info-submit-button" className='button button-primary' onClick={showEditRepairForm}>Add Repair Info</button>
                </div>
            </div>
        </div>
        {user ? <AuthFooter /> : <GenFooter />}
    </div>
  )
}

export default UpdateInstrument