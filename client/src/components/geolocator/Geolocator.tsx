/* eslint-disable react/prop-types */
import { FC, RefObject } from 'react';
import geolocatorIcon from '../../assets/geolocator-icon.svg';
import './Geolocator.css';

const Geolocator:FC<RefObject<HTMLDivElement>> = ({map}) => {

    const geolocateUser = ():void => {
        if ('geolocation' in navigator && map) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                map.current.flyTo({
                  center: [longitude, latitude],
                  essential: true,
                  zoom: 16,
                });
              }
            );
          }
    }

    return (
        <button onClick={geolocateUser} className="geolocator-btn" type='button'>
            <img src={geolocatorIcon} className="geolocator-btn-img" alt='geolocate user icon'/>
        </button>
    )
}

export default Geolocator;