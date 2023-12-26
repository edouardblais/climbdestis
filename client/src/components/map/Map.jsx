import { useEffect, useState, useRef } from 'react';
import { useQuery } from 'react-query'
import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-request-transformer';
import maplibregl from 'maplibre-gl';
import Sidebar from '../sidebar/Sidebar';
import MapToggle from '../maptoggle/MapToggle';
import SearchBar from '../searchbar/SearchBar';
import Geolocator from '../geolocator/Geolocator';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';
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
    const [showSidebar, setShowSidebar] = useState(false)
    const [areas, setAreas] = useState([]);
    const [mapLoading, setMapLoading] = useState(true);
    const [user, setUser] = useState(null);
    const map = useRef();
    const mapContainer = useRef();

    const mapboxData = useQuery('mapboxkey', () => 
        fetch('http://localhost:5000/apiKeys/getMapboxKey').then(res => res.json())
    ); 

    const { isLoading, error, data } = useQuery('allDestis', () =>
        fetch('http://localhost:5000/data/getAll').then(res =>res.json())
    );

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData)
        }
    }, [])

    const favorites = useQuery(
        ['favorites', user],
        async () => {
            if (user && user.id && user.jwtToken) {
                const response = await fetch(`http://localhost:5000/favorites/getFavorites/${user.id}`, {
                    headers: {
                    'Content-Type': 'application/json',
                    'jwtToken':`${user.jwtToken}`
                    }
                })
                const result = await response.json();
                return result
            }
        },
        {
          enabled: !!user, 
        }
    );

    useEffect(() => {
        if (mapboxData?.data?.length>0) {
            setMapboxKey(mapboxData.data[0]?.apikey)
        }
    }, [mapboxData])

    useEffect(() => {
        if (mapboxKey) {
            if (displayMapOptions) {
                setDisplayMapOptions(false)
            }
            if (map.current) {
                map.current.remove();
            }
            setMapLoading(true)
            map.current = new maplibregl.Map({
                container: mapContainer.current,
                style:mapDisplayed,
                center: center ?? [-73.561668, 45.508888],
                zoom: zoom ?? 8,
                attributionControl:false,
                trackResize:true,
                transformRequest
            });
            map.current.on('load', () => setMapLoading(false))
        }
    }, [mapDisplayed, mapboxKey])

    useEffect(() => {
        if (data && data.length>0) {
            const areasList = []
            data.forEach((desti) => {
                if (!areasList.includes(desti.area)) {
                    areasList.push(desti.area)
                }
            })
            setAreas(areasList)
        }
    }, [data])

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

    const handleMap = (newMap) => {
        if (mapDisplayed !== newMap) {
            setZoom(map.current.getZoom())
            setCenter([map.current.getCenter().lng, map.current.getCenter().lat])
            setChangingMap(true)
            setMapDisplayed(newMap)
        } else {
            setDisplayMapOptions(false)
        }
    }

    const handleFocus = (destination) => {
        if (destination?.longitude && destination?.latitude) {
            map.current.flyTo({
                center:[destination.longitude, destination.latitude],
                essential:true,
                zoom:12
            })
        }
        setDisplayDestinationInfo(true)
        setFocusedDestination(destination)
        setShowSidebar(true)
    }

    const handleDisplayDestinationInfo = (boolean) => {
        if (boolean) {
            setDisplayDestinationInfo(true)
        } else if (!boolean) {
            setDisplayDestinationInfo(false)
        }
    }

    const handleShowSidebar = () => {
        if (showSidebar) {
            setShowSidebar(false)
        } else if (!showSidebar) {
            setShowSidebar(true)
        }
    }

    const logout = () => {
        localStorage.clear();
        setUser(null)
    }

    return (
        <main className='map-container' ref={mapContainer}>
            <div className='map' ref={map}/>
            {(isLoading || mapLoading) && <LoadingSpinner/>}
            <SearchBar
                data={data}
                handleFocus={handleFocus}
            />
            <MapToggle 
                showSidebar={showSidebar}
                displayMapOptions={displayMapOptions} 
                handleMap={handleMap} 
                handleDisplayOptions={() => setDisplayMapOptions(true)}
            />
            <Sidebar 
                showSidebar={showSidebar} 
                handleShowSidebar={handleShowSidebar} 
                data={data} 
                areas={areas}
                focusedDestination={focusedDestination} 
                displayDestinationInfo={displayDestinationInfo} 
                handleDisplayDestinationInfo={handleDisplayDestinationInfo}
                handleFocus={handleFocus}
                user={user}
                logout={logout}
                favorites={favorites?.data}
            />
            <Geolocator 
                showSidebar={showSidebar}
                map={map}
            />
        </main>
    )
}

export default Map;