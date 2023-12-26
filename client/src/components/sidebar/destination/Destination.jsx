/* eslint-disable react/prop-types */
import {useTranslation} from "react-i18next";
import { Link } from 'react-router-dom';
import './Destination.css'
import backIcon from '../../../assets/back-icon.svg';
import eightanuIcon from '../../../assets/8a-icon.svg';
import mtnprojIcon from '../../../assets/mtnproj-icon.svg';
import gmapsIcon from '../../../assets/gmaps-icon.svg';
import meteomediaIcon from '../../../assets/meteomedia-icon.svg';
import spotwx10Icon from '../../../assets/spotwx-10-icon.png';
import spotwx4Icon from '../../../assets/spotwx-4-icon.png';
import spotwx2Icon from '../../../assets/spotwx-2-icon.png';
import fullSunIcon from '../../../assets/full-sun-icon.png';
import noSunIcon from '../../../assets/no-sun-icon.png';
import amSunIcon from '../../../assets/am-sun-icon.png';
import pmSunIcon from '../../../assets/pm-sun-icon.png';
import fqmeIcon from '../../../assets/fqme-icon.svg';

function Destination({focusedDestination, handleDisplayDestinationInfo}) {
    const [t,] = useTranslation();
    return (
        <div className='sidebar-destination-box'>
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
                        <h3 className='sidebar-destination-category'>{t('restrictions')}</h3>
                        <div className='sidebar-big-row-box padding-left-10px'>
                            <Link to={focusedDestination.restrictions} target="_blank"><img src={fqmeIcon} alt='fqme link' className="sidebar-destination-link-img"/></Link>
                        </div>
                    </div>
                    <div className="border-bottom"/>
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
    )
}

export default Destination;