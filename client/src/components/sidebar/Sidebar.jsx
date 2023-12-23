/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './Sidebar.css';
import ToggleLanguage from "./togglelanguage/ToggleLanguage";
import Destination from "./destination/Destination";
import Data from './data/Data';
import menuIcon from '../../assets/menu-icon.svg';
import menuCloseIcon from '../../assets/menu-close-icon.svg';
import logoIcon from '../../assets/logo-icon.png';
import logoutIcon from '../../assets/logout-icon.svg';
import loginIcon from '../../assets/login-icon.svg';

function Sidebar({showSidebar, handleShowSidebar, data, areas, focusedDestination, displayDestinationInfo, handleDisplayDestinationInfo, handleFocus, user, logout}) {
    return (
        <aside className="sidebar-main-box" style={{width:showSidebar?'300px':'50px', paddingLeft:showSidebar?'7px':'0px'}}>
            <div className="sidebar-row-box" style={{paddingLeft:showSidebar?'0px':'7px'}}>
                <img alt='logo' className='sidebar-logo' src={logoIcon}/>
                <h1 className={showSidebar?"sidebar-homecrag transform-opacity":"sidebar-homecrag transform-opacity-fast"} style={{opacity:showSidebar?1:0}}>HomeCrag</h1>
                {showSidebar && <div style={{flex:1}}/>}
                <button type='button' className={showSidebar?'sidebar-toggle-btn transform-opacity-delayed':'sidebar-toggle-btn transform-opacity-cancelled'} style={{opacity:showSidebar?1:0, paddingRight:showSidebar?'5px':'0px'}} onClick={handleShowSidebar}>
                    <img src={menuCloseIcon} className='sidebar-toggle-btn-img' alt='toggle menu'/>
                </button>
            </div>
            {!showSidebar && 
            <button type='button' className='sidebar-toggle-btn' onClick={handleShowSidebar} style={{width:showSidebar?'fit-content':'100%'}}>
                <img src={menuIcon} className='sidebar-toggle-btn-img' alt='toggle menu'/>
            </button>}
            {showSidebar && displayDestinationInfo && focusedDestination && <Destination focusedDestination={focusedDestination} handleDisplayDestinationInfo={handleDisplayDestinationInfo}/>}
            {showSidebar && !displayDestinationInfo && <Data data={data} areas={areas} handleFocus={handleFocus}/>}
            <div style={{flex:1}}/>
            {!user && <Link className='sidebar-link' to='/login' style={{width:showSidebar?'fit-content':'100%', alignSelf:showSidebar?'flex-end':null, paddingRight:showSidebar?'7px':'0px'}}><img src={loginIcon} className='sidebar-toggle-btn-img'/></Link>}
            {user && <button type='button' className='sidebar-toggle-btn' onClick={logout} style={{width:showSidebar?'fit-content':'100%'}}><img src={logoutIcon} className='sidebar-toggle-btn-img' alt='logout'/></button>}
            <ToggleLanguage showSidebar={showSidebar}/>
        </aside>
    )
}

export default Sidebar;