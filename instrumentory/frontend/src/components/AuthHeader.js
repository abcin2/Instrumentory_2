import './Header.css';
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

import { GiHamburgerMenu } from 'react-icons/gi';
import { VscClose } from 'react-icons/vsc';

import { NavLink } from 'react-router-dom';

function AuthHeader() {

  let {user, logoutUser} = useContext(AuthContext);

  const showNavLinksSide = () => {
    let page = document.querySelector('body');
    let background = document.getElementById('nav-links-side-background');
    let side_bar = document.getElementById('nav-links-side');
    let close_button = document.getElementById('close-button');

    side_bar.classList.remove('slide-out');
    close_button.classList.remove('slide-out');

    side_bar.classList.add('slide-in');
    close_button.classList.add('slide-in');

    background.classList.remove('fade-out');
    side_bar.classList.remove('fade-out');
    close_button.classList.remove('fade-out');

    background.classList.add('fade-in');
    side_bar.classList.add('fade-in');
    close_button.classList.add('fade-in');

    background.classList.remove('display-none');
    side_bar.classList.remove('display-none');
    close_button.classList.remove('display-none');

    background.classList.add('display-block');
    side_bar.classList.add('display-block');
    close_button.classList.add('display-block');

    page.classList.add('disable-scroll');
  }

  const closeNavLinksSide = () => {
    let page = document.querySelector('body');
    let background = document.getElementById('nav-links-side-background');
    let side_bar = document.getElementById('nav-links-side');
    let close_button = document.getElementById('close-button');

    page.classList.remove('disable-scroll');

    side_bar.classList.remove('slide-in');
    close_button.classList.remove('slide-in');

    side_bar.classList.add('slide-out');
    close_button.classList.add('slide-out');

    background.classList.remove('fade-in');
    side_bar.classList.remove('fade-in');
    close_button.classList.remove('fade-in');

    background.classList.add('fade-out');
    side_bar.classList.add('fade-out');
    close_button.classList.add('fade-out');

    setTimeout(() => {
      background.classList.remove('display-block');
      side_bar.classList.remove('display-block');
      close_button.classList.remove('display-block');

      background.classList.add('display-none');
      side_bar.classList.add('display-none');
      close_button.classList.add('display-none');
    }, 500) // this number is equal to number of milliseconds it takes to complete the animation

  }

  const showViewsLinks = () => {
    
    let links = document.getElementById('views-links');

    links.classList.remove('display-none');
    links.classList.remove('stretch-out');
    
    links.classList.add('display-flex');
    links.classList.add('stretch-out');
  }

  const hideViewsLinks = () => {
    
    let links = document.getElementById('views-links');

    links.classList.remove('display-flex');
    links.classList.remove('stretch-out');

    links.classList.add('display-none');
  }

  const showAddItemsLinks = () => {
    
    let links = document.getElementById('add-items-links');

    links.classList.remove('display-none');
    links.classList.remove('stretch-out');
    
    links.classList.add('display-block');
    links.classList.add('stretch-out');
  }

  const hideAddItemsLinks = () => {
    
    let links = document.getElementById('add-items-links');

    links.classList.remove('display-block');
    links.classList.remove('stretch-out');

    links.classList.add('display-none');
  }
  
  return (
    <div id="full-header" className='page'>
        <ul className="nav-ul">
          <li className="nav-text float-left"><p id="header-logo"><NavLink to="/" className='logo'>Instrumentory</NavLink></p></li>
          {/* Float Right Items */}
          <li className="nav-text float-right">{ user && <p id="header-text"><span style={{'fontWeight': 100}}>Welcome</span> { user.first_name } { user.last_name }<br /><span id="logout-link" onClick={logoutUser}>Logout</span></p>}</li>
        </ul>
        <ul id="nav-links" className="nav-ul">
          <li className="nav-link float-left"><p></p></li>
          <li className='nav-link float-left'><button onClick={showNavLinksSide} id='all-links'><GiHamburgerMenu size={15} /></button></li>
          <li className="nav-link float-left"><a href="/dashboard">DASHBOARD</a></li>
          <li id="views-cat" onMouseEnter={showViewsLinks} onMouseLeave={hideViewsLinks} className="nav-link float-left"><p className='nav-link-p'>VIEWS</p><div id="views-expanded">
            <ul id="views-links" className='display-none'>
              <li className="nav-link-abs-main"><a href="/full_inventory">All Instruments</a></li>
              <li className='nav-link-abs-main'><a href="/available_instruments">Available Instruments</a></li>
              <li className='nav-link-abs-main'><a href="/loaned_instruments">Loaned Instruments</a></li>
              <li className='nav-link-abs-main'><a href="/broken_instruments">Broken Instruments</a></li>
            </ul>
          </div></li>
          <li id="add-item-cat" onMouseEnter={showAddItemsLinks} onMouseLeave={hideAddItemsLinks} className="nav-link float-left"><p className='nav-link-p'>ADD ITEM</p><div id="views-expanded">
            <ul id="add-items-links" className='display-none'>
              <li className='nav-link-abs-main'><a href="/add_instrument/">Instrument</a></li>
            </ul>
          </div></li>
          <li className="nav-link float-left"><a href="/contact/">CONTACT</a></li>
          <li className="nav-link float-left"><a href="/whats_next/">WHAT'S NEXT?</a></li>
          <li className="nav-link float-left"><a href="/account/">ACCOUNT</a></li>
        </ul>
        <div id="nav-links-side-background" onClick={closeNavLinksSide} className='nav-links-side-background display-none'>
        </div>
          <ul id="nav-links-side" className="float-left display-none">
            <li id="hello-side" className="nav-link-abs"><p>Hello, { user.first_name }!</p></li>
            <li className="nav-link-abs"><a href="/dashboard">DASHBOARD</a></li>
            <li className="nav-link-abs-header"><p>VIEWS</p></li> {/* should be a button} */}
            <li className="nav-link-abs ind"><a href="/full_inventory">All Instruments</a></li>
            <li className="nav-link-abs ind"><a href="/available_instruments">Available Instruments</a></li>
            <li className="nav-link-abs ind"><a href="/loaned_instruments">Loaned Instruments</a></li>
            <li className="nav-link-abs ind"><a href="/broken_instruments">Broken Instruments</a></li>
            <li className="nav-link-abs-header"><p>ADD ITEM</p></li>
            <li className="nav-link-abs ind" style={{'marginBottom': '1rem'}}><a href="/add_instrument/">Instrument</a></li>
            <li className="nav-link-abs"><a href="/contact/">CONTACT</a></li>
            <li className="nav-link-abs"><a href="/whats_next/">WHAT'S NEXT?</a></li>
            <li className="nav-link-abs"><a href="/account/">ACCOUNT</a></li>
            <li className="nav-link-abs"><p style={{'marginTop': '1rem'}} id="logout-link" onClick={logoutUser}>Log Out</p></li>
          </ul>
          <div onClick={closeNavLinksSide} id="close-button" className='display-none'><VscClose size={30} /></div>
    </div>
  )
}

export default AuthHeader