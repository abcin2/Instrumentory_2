import './Footer.css'

import React from 'react'
import { NavLink } from 'react-router-dom'

function GenFooter() {

  return (
    <div id="full-footer">
        <div id="full-footer-top">
            <div id="links-grid">
                <div className='links-section'>
                    <div className='links-section-header'>
                        Account
                    </div>
                    <div className='links-section-links'>
                        <NavLink to='/login/' className="no-decoration">Login</NavLink>
                    </div>
                </div>
                <div className='links-section'>
                    <div className='links-section-header'>
                        Customer Support
                    </div>
                    <div className='links-section-links'>
                        <NavLink to='/contact/' className="no-decoration">Contact</NavLink>
                    </div>
                </div>
                <div className='links-section'>
                    <div className='links-section-header'>
                        What's Next?
                    </div>
                    <div className='links-section-links'>
                        <NavLink to='/whats_next/' className="no-decoration">Digital Library</NavLink>
                        <NavLink to='/whats_next/' className="no-decoration">Docusign</NavLink>
                        <NavLink to='/whats_next/' className="no-decoration">Mobile App</NavLink>
                    </div>
                </div>
                <div className='links-section'>
                    <div className='links-section-header'>
                        Social Media
                    </div>
                    <div className='links-section-links'>
                        <NavLink to='#' className="no-decoration">coming soon...</NavLink>
                    </div>
                </div>
            </div>
            {/* <div id='links-table'>
                <table>
                    <tbody>
                        <tr>
                            <th>Account</th>
                            <th>Customer Support</th>
                            <th>What's Next?</th>
                            <th>Social Media</th>
                        </tr>
                        <tr>
                            <td><NavLink to='/login/' className="no-decoration">Login</NavLink></td>
                            <td><NavLink to='/contact/' className="no-decoration">Contact</NavLink></td>
                            <td>Digital Library</td>
                            <td>coming soon...</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Docusign</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Mobile App</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
        </div>
        <div id="full-footer-bottom">
            Last updated, September 28 2022.
        </div>
    </div>
  )
}

export default GenFooter