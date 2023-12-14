import './Sidebar.css';
import backIcon from '../../assets/back-icon.svg';

/* eslint-disable react/prop-types */
function Sidebar({results, focusedDestination, displayDestinationInfo, handleDisplayDestinationInfo}) {
    return (
        <aside className="sidebar-main-box">
            <div className="sidebar-logo-box"></div>
            <div className="sidebar-content-box">
            {displayDestinationInfo && focusedDestination?
            <div className='sidebar-destination-box'>
                <div className='sidebar-destination-top-box'>
                    <button className='sidebar-back-btn' type='button' onClick={() => handleDisplayDestinationInfo(false)}>
                        <img alt='back to search results' src={backIcon} className='sidebar-back-btn-img'/>
                    </button>
                    <h1>{focusedDestination.destination}</h1>
                </div>
            </div>
            :
            <div className='sidebar-search-results-box'>
                {results.length>0?
                results.map((result) => {
                    <div className='sidebar-search-result'>
                        <h2>{result.destination}</h2>
                    </div>
                })
                :
                null
                }
            </div>
            }
            </div>
        </aside>
    )
}

export default Sidebar;