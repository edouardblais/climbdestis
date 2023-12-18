/* eslint-disable react/prop-types */
import './Sidebar.css';
import ToggleLanguage from "./togglelanguage/ToggleLanguage";
import Destination from "./destination/Destination";
import Data from './data/Data';
import menuIcon from '../../assets/menu-icon.svg';
import menuCloseIcon from '../../assets/menu-close-icon.svg';
import logoIcon from '../../assets/logo-icon.png';

function Sidebar({showSidebar, handleShowSidebar, data, areas, focusedDestination, displayDestinationInfo, handleDisplayDestinationInfo, handleFocus}) {
    return (
        <aside className="sidebar-main-box" style={{width:showSidebar?'300px':'50px', paddingLeft:showSidebar?'7px':'0px'}}>
            <div className="sidebar-row-box" style={{paddingLeft:showSidebar?'0px':'7px'}}>
                <img alt='logo' className='sidebar-logo' src={logoIcon}/>
                {showSidebar && <h1 className="sidebar-homecrag">HomeCrag</h1>}
                {showSidebar && <div style={{flex:1}}/>}
                {showSidebar && 
                <button type='button' className='sidebar-toggle-btn' onClick={handleShowSidebar}>
                    <img src={menuCloseIcon} className='sidebar-toggle-btn-img' alt='toggle menu'/>
                </button>}
            </div>
            {!showSidebar && 
            <button type='button' className='sidebar-toggle-btn' onClick={handleShowSidebar} style={{width:showSidebar?'fit-content':'100%'}}>
                <img src={menuIcon} className='sidebar-toggle-btn-img' alt='toggle menu'/>
            </button>}
            {showSidebar && displayDestinationInfo && focusedDestination && <Destination focusedDestination={focusedDestination} handleDisplayDestinationInfo={handleDisplayDestinationInfo}/>}
            {showSidebar && !displayDestinationInfo && <Data data={data} areas={areas} handleFocus={handleFocus}/>}
            <div style={{flex:1}}/>
            <ToggleLanguage showSidebar={showSidebar}/>
        </aside>
    )
}

export default Sidebar;