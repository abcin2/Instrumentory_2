import './AddInstrument.css'
import React, { useContext, useState } from 'react';

import AuthContext from '../context/AuthContext';
import AuthHeader from '../components/AuthHeader';
import GenHeader from '../components/GenHeader';
import AuthFooter from '../components/AuthFooter';
import GenFooter from '../components/GenFooter';

// import AutoComplete from '../components/AutoComplete';

function AddInstrument() {

    const { user } = useContext(AuthContext);

    const [instrumentType, setInstrumentType] = useState('');
    const [instrumentMake, setInstrumentMake] = useState('');
    const [instrumentModel, setInstrumentModel] = useState('');
    const [instrumentSerial, setInstrumentSerial] = useState('');
    const [instrumentImage, setInstrumentImage] = useState('');
    const [mouthpiece, setMouthpiece] = useState(false);
    const [slideGrease, setSlideGrease] = useState(false);
    const [slideOil, setSlideOil] = useState(false);
    const [valveOil, setValveOil] = useState(false);
    const [ligature, setLigature] = useState(false);
    const [reeds, setReeds] = useState(false);
    const [corkGrease, setCorkGrease] = useState(false);
    const [neckStrap, setNeckStrap] = useState(false);
    const [swab, setSwab] = useState(false);

    // I could dynamically change the checkbox options depending on what instrument is selected.
    // I could remove the options for accessories for instruments that are not currently in the database.
    // These could be added later if/when they are needed.

    const addInstrument = async (e) => {
        e.preventDefault()
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
        // loan info and repair info are set to defaults in view
        // still need to check and log errors for blank inputs

        let instrument_response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/instruments/create/`, {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json'
            // }, apparently I don't need headers if I am sending form data
            body: data
        })
        // let instrument_instance = await instrument_response.json()
        if (instrument_response.ok) {
            const form = document.getElementById('create-instrument-form');
            // reset the form
            form.reset();
            // reset the state
            setInstrumentType('');
            setInstrumentMake('');
            setInstrumentModel('');
            setInstrumentSerial('');
            setInstrumentImage('');
            setMouthpiece(false);
            setSlideGrease(false);
            setSlideOil(false);
            setValveOil(false);
            setLigature(false);
            setReeds(false);
            setCorkGrease(false);
            setNeckStrap(false);
            setSwab(false);
            // success message pops up with instrument
            console.log('success!');
            alert(`${instrumentType}: ${instrumentSerial} successfully added!`)
        }
    }

  return (
    <div id="add-instrument-full-page">
        {user ? <AuthHeader /> : <GenHeader />}
        <div className='page'>
            <div id="add-instrument-header">
                <h1>Add an Instrument</h1>
            </div>
            <div id="add-instrument-form" className='card'>
                <form id="create-instrument-form" onSubmit={addInstrument}>
                    <div id="instrument-type-input">
                        <input className='input-text login-input' type="text" placeholder='Instrument Type' onChange={e => setInstrumentType(e.target.value)} />
                        <input className='input-text login-input' type="text" placeholder='Make' onChange={e => setInstrumentMake(e.target.value)} />
                        <input className='input-text login-input' type="text" placeholder='Model' onChange={e => setInstrumentModel(e.target.value)} />
                        <input className='input-text login-input' type="text" placeholder='Serial' onChange={e => setInstrumentSerial(e.target.value)} />
                    </div>
                    <div id="instrument-image-input" className='input-text login-input'>
                        <div id="file-chosen-text">
                            {instrumentImage ? 'Image Selected!' : 'Select Image'}
                        </div>
                        <input className='image-input' type="file" onChange={e => setInstrumentImage(e.target.files[0])} />
                    </div>
                    <div id="instrument-accessories-input">
                        <div className="checkbox-and-label">
                            <input type="checkbox" name="mouthpiece" value="mouthpiece" onChange={e => setMouthpiece(e.target.checked)} />
                            <label htmlFor="mouthpiece">Mouthpiece</label> 
                        </div>
                        <div className="checkbox-and-label">
                            <input type="checkbox" name="slide-grease" value="slide-grease" onChange={e => setSlideGrease(e.target.checked)} />
                            <label htmlFor="slide-grease">Slide Grease</label> 
                        </div>
                        <div className="checkbox-and-label">
                            <input type="checkbox" name="slide-oil" value="slide-oil" onChange={e => setSlideOil(e.target.checked)} />
                            <label htmlFor="slide-oil">Slide Oil</label> 
                        </div>
                        <div className="checkbox-and-label">
                            <input type="checkbox" name="valve-oil" value="valve-oil" onChange={e => setValveOil(e.target.checked)} />
                            <label htmlFor="valve-oil">Valve Oil</label> 
                        </div>
                        <div className="checkbox-and-label">
                            <input type="checkbox" name="ligature" value="ligature" onChange={e => setLigature(e.target.checked)} />
                            <label htmlFor="ligature">Ligature</label> 
                        </div>
                        <div className="checkbox-and-label">
                            <input type="checkbox" name="reeds" value="reeds" onChange={e => setReeds(e.target.checked)} />
                            <label htmlFor="reeds">Reeds</label> 
                        </div>
                        <div className="checkbox-and-label">
                            <input type="checkbox" name="cork-grease" value="cork-grease" onChange={e => setCorkGrease(e.target.checked)} />
                            <label htmlFor="cork-grease">Cork Grease</label> 
                        </div>
                        <div className="checkbox-and-label">
                            <input type="checkbox" name="neck-strap" value="neck-strap" onChange={e => setNeckStrap(e.target.checked)} />
                            <label htmlFor="neck-strap">Neck Strap</label> 
                        </div>
                        <div className="checkbox-and-label">
                            <input type="checkbox" name="swab" value="swab" onChange={e => setSwab(e.target.checked)} />
                            <label htmlFor="swab">Swab</label>
                        </div>
                    </div>
                    <div id="add-instrument-submit-div">
                        <input id="add-instrument-submit-button" className='button-success' type="submit" value="Add Instrument" />
                    </div>
                </form>
            </div>
        </div>
        {user ? <AuthFooter /> : <GenFooter />}
    </div>
  )
}

export default AddInstrument