/* eslint-disable react/prop-types */
import geolocatorIcon from '../../assets/geolocator-icon.svg';
import './Geolocator.css'

function Geolocator({map}) {

    const geolocateUser = () => {
        if ('geolocation' in navigator) {
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