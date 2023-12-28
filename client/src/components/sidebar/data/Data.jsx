/* eslint-disable react/prop-types */
import {useTranslation} from "react-i18next";
import { useState } from 'react';
import './Data.css';
import downIcon from '../../../assets/down-icon.svg';
import upIcon from '../../../assets/up-icon.svg';
import mapIcon from '../../../assets/map-icon.svg';

function Data({data, areas, handleFocus}) {
    const [t,] = useTranslation();
    const [displayArea, setDisplayArea] = useState([]);

    const showArea = (area) => {
        if (displayArea.includes(area)) {
            const newAreasArray = displayArea.filter((ar) => area!==ar)
            setDisplayArea(newAreasArray)
        } else if (!displayArea.includes(area)) {
            setDisplayArea((prevState) => [...prevState, area])
        }
    }

    return (
        <div className='sidebar-categories-box'>
            <div className="sidebar-category-title-box">
                <img src={mapIcon} className='sidebar-category-icon'/>
                <h2 className="sidebar-category-title">{t('climbingdestis')}</h2>
            </div>
            {areas.length>0 && 
            areas.map((area) => {
                return (
                    <div className='sidebar-category-box' key={area}>
                        <div className='sidebar-category-title-box'>
                            <h3 className='sidebar-category'>{area}</h3>
                            <button type='button' onClick={() => showArea(area)} className='sidebar-category-display-btn'>
                                <img src={displayArea.includes(area)?upIcon:downIcon} alt='see or hide category' className='sidebar-category-display-btn-img'/>
                            </button>
                        </div>
                        <div className='sidebar-category-destination-box'>
                        {data.length>0 && 
                        data.map((desti) => {
                            if (desti.area === area) {
                                return (
                                    <button className='sidebar-category-destination-btn' onClick={() => handleFocus(desti)} key={desti.id} style={{display:displayArea.includes(desti.area)?'flex':'none'}}>{desti.destination}</button>
                                )
                            }
                        })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Data;