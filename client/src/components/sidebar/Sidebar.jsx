import {useTranslation} from "react-i18next";
import { Link } from 'react-router-dom';
import './Sidebar.css';
import ToggleLanguage from "./togglelanguage/ToggleLanguage";
import backIcon from '../../assets/back-icon.svg';
import menuIcon from '../../assets/menu-icon.svg';
import menuCloseIcon from '../../assets/menu-close-icon.svg';
import eightanuIcon from '../../assets/8a-icon.svg';
import mtnprojIcon from '../../assets/mtnproj-icon.svg';
import logoIcon from '../../assets/logo-icon.png';
import gmapsIcon from '../../assets/gmaps-icon.svg';
import meteomediaIcon from '../../assets/meteomedia-icon.svg';
import spotwx10Icon from '../../assets/spotwx_10-icon.svg';
import spotwx4Icon from '../../assets/spotwx_4-icon.png';
import spotwx2Icon from '../../assets/spotwx_2-icon.png';
import fullSunIcon from '../../assets/full-sun-icon.png';
import noSunIcon from '../../assets/no-sun-icon.png';
import amSunIcon from '../../assets/am-sun-icon.png';
import pmSunIcon from '../../assets/pm-sun-icon.png';

/* eslint-disable react/prop-types */
function Sidebar({showSidebar, handleShowSidebar, results, focusedDestination, displayDestinationInfo, handleDisplayDestinationInfo}) {
    const [t,] = useTranslation();
    console.log(results)
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
            {!showSidebar && <button type='button' className='sidebar-toggle-btn' onClick={handleShowSidebar} style={{width:showSidebar?'fit-content':'100%'}}>
                <img src={menuIcon} className='sidebar-toggle-btn-img' alt='toggle menu'/>
            </button>}
            {showSidebar && 
            <div className="sidebar-content-box">
            {displayDestinationInfo && focusedDestination?
                <div className='sidebar-big-column-box'>
                    <div className='sidebar-row-box' style={{paddingBottom:'5px'}}>
                        <button className='sidebar-toggle-btn' type='button' onClick={() => handleDisplayDestinationInfo(false)}>
                            <img alt='back to search results' src={backIcon} className='sidebar-toggle-btn-img-small'/>
                        </button>
                        <div className="sidebar-column-box">
                            <h1 className='sidebar-destination-name'>{focusedDestination.destination}</h1>
                            <h2 className='sidebar-destination-area'>{focusedDestination.area}, {focusedDestination.region}, {focusedDestination.country}</h2>
                        </div>
                    </div>
                    <div className='sidebar-column-box padding-left-10px'>
                        <h3 className='sidebar-destination-category'>{t('orientation')}</h3>
                        <div className='sidebar-big-row-box padding-left-10px'>
                            {focusedDestination.orientation === 'south' && 
                            <div className="sidebar-row-box">
                                <img src={fullSunIcon} alt='full sun img' className="sidebar-destination-link-img"/>
                                <h4 className="sidebar-destination-text">{t('allDaySun')}</h4>
                            </div>}
                            {focusedDestination.orientation === 'north' && 
                            <div className="sidebar-row-box">
                                <img src={noSunIcon} alt='no sun img' className="sidebar-destination-link-img"/>
                                <h4 className="sidebar-destination-text">{t('allDayShade')}</h4>
                            </div>}
                            {focusedDestination.orientation === 'east' && 
                            <div className="sidebar-row-box">
                                <img src={amSunIcon} alt='am sun img' className="sidebar-destination-link-img"/>
                                <h4 className="sidebar-destination-text"> {t('amSun')}</h4>
                            </div>}
                            {focusedDestination.orientation === 'west' && 
                            <div className="sidebar-row-box">
                                <img src={pmSunIcon} alt='pm sun img' className="sidebar-destination-link-img"/>
                                <h4 className="sidebar-destination-text"> {t('pmSun')}</h4>
                            </div>}
                        </div>
                    </div>
                    <div className="border-bottom"/>
                    <div className='sidebar-column-box padding-left-10px'>
                        <h3 className='sidebar-destination-category'>{t('routesinfo')}</h3>
                        <div className='sidebar-big-row-box padding-left-10px'>
                            <Link to={focusedDestination['8a']} target="_blank"><img src={eightanuIcon} alt='8a.nu link' className="sidebar-destination-link-img"/></Link>
                            <Link to={focusedDestination.mountainproject} target="_blank"><img src={mtnprojIcon} alt='mountain project link' className="sidebar-destination-link-img"/></Link>
                        </div>
                    </div>
                    <div className="border-bottom"/>
                    <div className='sidebar-column-box padding-left-10px'>
                        <h3 className='sidebar-destination-category'>Directions</h3>
                        <div className='sidebar-big-row-box padding-left-10px'>
                            <Link to={focusedDestination.gmaps} target="_blank"><img src={gmapsIcon} alt='google maps link' className="sidebar-destination-link-img"/></Link>
                        </div>
                    </div>
                    <div className="border-bottom"/>
                    <div className='sidebar-column-box padding-left-10px'>
                        <h3 className='sidebar-destination-category'>{t('weather')}</h3>
                        <div className='sidebar-big-row-box padding-left-10px'>
                            <Link to={focusedDestination.weather_channel} target="_blank"><img src={meteomediaIcon} alt='weather channel link' className="sidebar-destination-link-img"/></Link>
                            <Link to={focusedDestination.spotwx_2} target="_blank"><img src={spotwx2Icon} alt='spotwx 2 days link' className="sidebar-destination-link-img"/></Link>
                            <Link to={focusedDestination.spotwx_4} target="_blank"><img src={spotwx4Icon} alt='spotwx 4 days link' className="sidebar-destination-link-img"/></Link>
                            <Link to={focusedDestination.spotwx_10} target="_blank"><img src={spotwx10Icon} alt='spotwx 10 days link' className="sidebar-destination-link-img"/></Link>
                        </div>
                    </div>
                </div>
                :
                <div className='sidebar-content-box'>
                    {results?.length>0?
                    results.map((result) => (
                        <div className='sidebar-column-box' key={result.id}>
                            <h2 className='sidebar-destination-name'>{result.destination}</h2>
                            <h3 className='sidebar-destination-area'>{result.area}, {result.region}, {result.country}</h3>
                        </div>
                    ))
                    :
                    null
                    }
                </div>}
            </div>
            }
            <div style={{flex:1}}/>
            <ToggleLanguage showSidebar={showSidebar}/>
        </aside>
    )
}

export default Sidebar;