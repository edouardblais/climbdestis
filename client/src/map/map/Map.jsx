import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Map.css';

function Map() {
    const [zoom, setZoom] = useState(8);
    const [center, setCenter] = useState([-72.545088, 46.341778])
    const map = useRef();
    const mapContainer = useRef();
    const {area} = useParams();
    const {destination_id} = useParams();

    useEffect(() => {
        if (map.current) {
            map.current.remove();
        }
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style:mapDisplayed,
            center: center ?? [-72.545088, 46.341778],
            zoom: zoom ?? 8,
            attributionControl:false,
            trackResize:true,
            transformRequest
        });  
    }, [mapDisplayed]) 

    return (
        <main></main>
    )
}

export default Map;