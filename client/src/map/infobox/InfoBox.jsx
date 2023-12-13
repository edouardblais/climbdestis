/* eslint-disable react/prop-types */
import {useTranslation} from "react-i18next";
import './InfoBox.css'

function InfoBox({focusedDestination, handleClose}) {
    const [t,] = useTranslation();
    
    return (
        <div className="infobox-main">
            <h1 className="infobox-desti">{focusedDestination.destination}</h1>
            <button onClick={handleClose} className="infobox-close-btn">{t('close')}</button>
        </div>
    )
}

export default InfoBox;