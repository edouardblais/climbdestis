/* eslint-disable react/prop-types */
import './MapToggle.css'
import map1 from '../../assets/map1.png';
import map2 from '../../assets/map2.png';
import map3 from '../../assets/map3.png';
import map4 from '../../assets/map4.png';
import mapOptionsIcon from '../../assets/map-options-icon.svg';

function MapToggle({displayMapOptions, handleMap, handleDisplayOptions}) {
    return (
        <>
            {displayMapOptions?
                <div className='maptoggle-box'>
                    <button type='button' onClick={() => handleMap('mapbox://styles/mapbox/light-v11')} aria-label="Choose light map" className='maptoggle-btn'>
                        <img alt='' src={map2} className='maptoggle-img'/>
                    </button>
                    <button type='button' onClick={() => handleMap('mapbox://styles/mapbox/streets-v12')} aria-label="Choose street map" className='maptoggle-btn'>
                        <img alt='' src={map1} className='maptoggle-img'/>
                    </button>
                    <button type='button' onClick={() => handleMap('mapbox://styles/mapbox/satellite-streets-v12')} aria-label="Choose satellite map" className='maptoggle-btn'>
                        <img alt='' src={map4} className='maptoggle-img'/>
                    </button>
                    <button type='button' onClick={() => handleMap('mapbox://styles/mapbox/dark-v11')} aria-label="Choisir dark map" className='maptoggle-btn'>
                        <img alt='' src={map3} className='maptoggle-img'/>
                    </button>
                </div>
                :
                <button className='maptoggle-options-btn' onClick={handleDisplayOptions} aria-label="display map background options" type='button'>
                    <img alt='' src={mapOptionsIcon} className='maptoggle-options-img'/>
                </button>
            }
        </>
    )
}

export default MapToggle;