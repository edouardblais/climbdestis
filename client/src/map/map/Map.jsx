import { useEffect, useState, useRef } from 'react';
import { useQuery } from 'react-query'
// import { useParams } from 'react-router-dom';
import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-request-transformer';
import maplibregl from 'maplibre-gl';
import Popup from '../popup/Popup';
import './Map.css';
import map1 from '../../assets/map1.png';
import map2 from '../../assets/map2.png';
import map3 from '../../assets/map3.png';
import map4 from '../../assets/map4.png';
import mapOptionsIcon from '../../assets/map-options-icon.svg';

function Map() {
    const [zoom, setZoom] = useState(8);
    const [center, setCenter] = useState([-73.561668, 45.508888]);
    const [mapDisplayed, setMapDisplayed] = useState('mapbox://styles/mapbox/light-v11');
    const [changingMap, setChangingMap] = useState(false);
    const [displayMapOptions, setDisplayMapOptions] = useState(false);
    const [focusedDestination, setFocusedDestination] = useState(null);
    const [pins, setPins] = useState([])
    const map = useRef();
    const mapContainer = useRef();
    // const {area} = useParams();
    // const {destination_id} = useParams();
    const mapboxKey = 'pk.eyJ1IjoiZWRvdWFyZGJsYWlzIiwiYSI6ImNscTJsbG8ycTAyYmwya3F3cmI0aGg0ZDMifQ.p9F2drk10GRH3X6d95rmJw';

    const { isLoading, error, data } = useQuery('allDestis', () =>
        fetch('http://localhost:5000/').then(res =>
            res.json()
        )
    )

    useEffect(() => {
        if (displayMapOptions) {
            setDisplayMapOptions(false)
        }
        if (map.current) {
            map.current.remove();
        }
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style:mapDisplayed,
            center: center ?? [-73.561668, 45.508888],
            zoom: zoom ?? 8,
            attributionControl:false,
            trackResize:true,
            transformRequest
        });
    }, [mapDisplayed])

    useEffect(() => {
        if (data && data.length>0 && !isLoading && !error && map) {
            if (changingMap) {
                setPins([])
                setChangingMap(false)
            }
            data.forEach((desti) => {
                if (!pins.includes(desti.id) && desti.latitude && desti.longitude) {
                    const pinIcon = document.createElement('button');
                    pinIcon.classList.add('pin-icon')
                    const pin = new maplibregl.Marker(null, {
                        anchor: 'bottom',
                        offset: [0, 6]
                    });
                    pin._element = pinIcon;
                    pin.setLngLat([desti.longitude, desti.latitude]);
                    pin.addTo(map.current);
                    setPins(prevState => [...prevState, desti.id])
                    pinIcon.addEventListener('click', () => handleFocus(desti))
                }
            })
        }
    }, [changingMap, data, map])

    const transformRequest = (url, resourceType) => {
        if (isMapboxURL(url)) {
            return transformMapboxUrl(url, resourceType, mapboxKey)
        }
        return {url}
    }

    const changeMap = (map) => {
        if (mapDisplayed !== map) {
            setChangingMap(true)
            setMapDisplayed(map)
        } else {
            setDisplayMapOptions(false)
        }
    }

    const handleFocus = (destination) => {
        setFocusedDestination(destination)
        if (destination?.longitude && destination?.latitude) {
            map.current.flyTo({
                center:[destination.longitude, destination.latitude],
                essential:true,
                zoom:18
            })
            setCenter([destination.longitude, destination.latitude])
            setZoom(18)
        }
    }

    return (
        <main className='map-container' ref={mapContainer}>
            <div className='map' ref={map}/>
            {displayMapOptions?
            <div className='choose-map-box'>
                <button type='button' onClick={() => changeMap('mapbox://styles/mapbox/light-v11')} aria-label="Choose light map" className='choose-map-btn'>
                    <img alt='' src={map2} className='choose-map-img'/>
                </button>
                <button type='button' onClick={() => changeMap('mapbox://styles/mapbox/streets-v12')} aria-label="Choose street map" className='choose-map-btn'>
                    <img alt='' src={map1} className='choose-map-img'/>
                </button>
                <button type='button' onClick={() => changeMap('mapbox://styles/mapbox/satellite-streets-v12')} aria-label="Choose satellite map" className='choose-map-btn'>
                    <img alt='' src={map4} className='choose-map-img'/>
                </button>
                <button type='button' onClick={() => changeMap('mapbox://styles/mapbox/dark-v11')} aria-label="Choisir dark map" className='choose-map-btn'>
                    <img alt='' src={map3} className='choose-map-img'/>
                </button>
            </div>
            :
            <button className='display-map-options-btn' onClick={() => setDisplayMapOptions(true)} aria-label="display map background options" type='button'>
                <img alt='' src={mapOptionsIcon} className='display-map-options-img'/>
            </button>
            }
            {focusedDestination && <Popup focusedDestination={focusedDestination} handleFocus={handleFocus}/>}
        </main>
    )
}

export default Map;