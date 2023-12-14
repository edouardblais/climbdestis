import { useEffect, useState, useRef } from 'react';
import { useQuery } from 'react-query'
// import { useParams } from 'react-router-dom';
import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-request-transformer';
import maplibregl from 'maplibre-gl';
import Sidebar from '../sidebar/Sidebar';
import MapToggle from '../maptoggle/MapToggle';
import './Map.css';

function Map() {
    const [mapboxKey, setMapboxKey] = useState('')
    const [zoom, setZoom] = useState(8);
    const [center, setCenter] = useState([-73.561668, 45.508888]);
    const [mapDisplayed, setMapDisplayed] = useState('mapbox://styles/mapbox/light-v11');
    const [changingMap, setChangingMap] = useState(false);
    const [displayMapOptions, setDisplayMapOptions] = useState(false);
    const [focusedDestination, setFocusedDestination] = useState(null);
    const [displayDestinationInfo, setDisplayDestinationInfo] = useState(false)
    const [pins, setPins] = useState([]);
    const [searchResults,] = useState([]);
    const map = useRef();
    const mapContainer = useRef();
    // const {area} = useParams();
    // const {destination_id} = useParams();

    const mapboxData = useQuery('mapboxkey', () => 
        fetch('http://localhost:5000/mapboxkey').then(res =>
            res.json()
        )
    ); 

    useEffect(() => {
        if (mapboxData?.data?.length>0) {
            setMapboxKey(mapboxData.data[0]?.apikey)
        }
    }, [mapboxData])

    const { isLoading, error, data } = useQuery('allDestis', () =>
        fetch('http://localhost:5000/').then(res =>
            res.json()
        )
    )

    useEffect(() => {
        if (mapboxKey) {
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
        }
    }, [mapDisplayed, mapboxKey])

    useEffect(() => {
        if (data && data.length>0 && !isLoading && !error && map && mapboxKey) {
            if (changingMap) {
                setPins([])
                setChangingMap(false)
            }
            data.forEach((desti) => {
                if (!pins.includes(desti.id) && desti.latitude && desti.longitude) {
                    const pinIcon = document.createElement('button');
                    pinIcon.classList.add('pin-icon')
                    const pin = new maplibregl.Marker(null);
                    pin._element = pinIcon;
                    pin.setLngLat([desti.longitude, desti.latitude]);
                    pin.addTo(map.current);
                    setPins(prevState => [...prevState, desti.id]);
                    pinIcon.addEventListener('click', () => handleFocus(desti));
                }
            })
        }
    }, [changingMap, data, map, mapboxKey])

    const transformRequest = (url, resourceType) => {
        if (isMapboxURL(url)) {
            return transformMapboxUrl(url, resourceType, mapboxKey)
        }
        return {url}
    }

    const handleMap = (map) => {
        if (mapDisplayed !== map) {
            setChangingMap(true)
            setMapDisplayed(map)
        } else {
            setDisplayMapOptions(false)
        }
    }

    const handleFocus = (destination) => {
        if (destination?.longitude && destination?.latitude) {
            map.current.flyTo({
                center:[destination.longitude, destination.latitude],
                essential:true,
                zoom:18
            })
            setCenter([destination.longitude, destination.latitude])
            setZoom(18)
        }
        setDisplayDestinationInfo(true)
        setFocusedDestination(destination)
    }

    const handleDisplayDestinationInfo = (boolean) => {
        if (boolean) {
            setDisplayDestinationInfo(true)
        } else if (!boolean) {
            setDisplayDestinationInfo(false)
        }
    }

    return (
        <main className='map-container' ref={mapContainer}>
            <div className='map' ref={map}/>
            <MapToggle displayMapOptions={displayMapOptions} handleMap={handleMap} handleDisplayOptions={() => setDisplayMapOptions(true)}/>
            <Sidebar results={searchResults.length>0?searchResults:data} focusedDestination={focusedDestination} displayDestinationInfo={displayDestinationInfo} handleDisplayDestinationInfo={handleDisplayDestinationInfo}/>
        </main>
    )
}

export default Map;