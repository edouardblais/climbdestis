/* eslint-disable react/prop-types */
import geolocatorIcon from '../../assets/geolocator-icon.svg';
import './Geolocator.css'

function Geolocator({showSidebar, map}) {

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
        <button onClick={geolocateUser} className="geolocator-btn" type='button' style={{left:showSidebar?'326px':'76px'}}>
            <img src={geolocatorIcon} className="geolocator-btn-img" alt='geolocate user icon'/>
        </button>
    )
}

export default Geolocator;