import {useTranslation} from "react-i18next";
import { Link } from 'react-router-dom';
import './Sidebar.css';
import backIcon from '../../assets/back-icon.svg';
import menuIcon from '../../assets/menu-icon.svg';
import eightanuIcon from '../../assets/8a-icon.svg';
import mtnprojIcon from '../../assets/mtnproj-icon.svg';

/* eslint-disable react/prop-types */
function Sidebar({showSidebar, handleShowSidebar, results, focusedDestination, displayDestinationInfo, handleDisplayDestinationInfo}) {
    const [t,] = useTranslation();
    return (
        <aside className="sidebar-main-box" style={{width:showSidebar?'300px':'35px'}}>
            <div className="sidebar-row-box">
                <img alt='logo' className='sidebar-logo'/>
                <h1 className="sidebar-homecrag">HomeCrag</h1>
            </div>
            <button type='button' className='sidebar-toggle-btn' onClick={handleShowSidebar}>
                <img src={menuIcon} className='sidebar-toggle-img' alt='toggle menu'/>
            </button>
            {showSidebar && 
            <div className="sidebar-content-box">
            {displayDestinationInfo && focusedDestination?
                <div className='sidebar-big-column-box'>
                    <div className='sidebar-row-box'>
                        <button className='sidebar-toggle-btn' type='button' onClick={() => handleDisplayDestinationInfo(false)}>
                            <img alt='back to search results' src={backIcon} className='sidebar-toggle-img'/>
                        </button>
                        <h1 className='sidebar-destination-name'>{focusedDestination.destination}</h1>
                        <h2 className='sidebar-destination-area'>{focusedDestination.area}, {focusedDestination.country}</h2>
                    </div>
                    <div className='sidebar-column-box'>
                        <h3 className='sidebar-destination-category'>{t('routesinfo')}</h3>
                        <div className='sidebar-big-row-box'>
                            <Link to={focusedDestination['8a']} target="_blank"><img src={eightanuIcon} alt='8a.nu link' className="sidebar-destination-link-img"/></Link>
                            <Link to={focusedDestination.mountainproject} target="_blank"><img src={mtnprojIcon} alt='mountain project link' className="sidebar-destination-link-img"/></Link>
                        </div>
                    </div>
                </div>
                :
                <div className='sidebar-content-box'>
                    {results?.length>0?
                    results.map((result) => (
                        <div className='sidebar-column-box' key={result.id}>
                            <h2 className='sidebar-destination-name'>{result.destination}</h2>
                            <h3 className='sidebar-destination-area'>{result.area}, {result.country}</h3>
                        </div>
                    ))
                    :
                    null
                    }
                </div>}
            </div>
            }
        </aside>
    )
}

export default Sidebar;