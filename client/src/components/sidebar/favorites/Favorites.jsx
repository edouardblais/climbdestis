/* eslint-disable react/prop-types */
import {useTranslation} from "react-i18next";
import './Favorites.css';
import starIcon from '../../../assets/star-icon.svg'
import { useState } from "react";
import downIcon from '../../../assets/down-icon.svg';
import upIcon from '../../../assets/up-icon.svg';
import infoIcon from '../../../assets/info-icon.svg';

function Favorites({user}) {
    const [t,] = useTranslation();
    const [displayFavorites, setDisplayFavorites] = useState(false);
    const [displayLoginMessage, setDisplayLoginMessage] = useState(false);

    return(
        <div className="favorites-column-box">
            <div className="favorites-row-box">
                <img src={starIcon} alt='' className='favorites-icon'/>
                <h3 className="favorites-title">{t('favorites')}</h3>
                {user &&
                <button type='button' className="favorites-button" onClick={displayFavorites?() => setDisplayFavorites(false):() => setDisplayFavorites(true)}>
                    <img className="favorites-icon-alt" alt='toggle favorites icon' src={displayFavorites?upIcon:downIcon}/>
                </button>
                }
                {!user &&
                <button type='button' className="favorites-button" onClick={displayLoginMessage?() => setDisplayLoginMessage(false):() => setDisplayLoginMessage(true)}>
                    <img className="favorites-icon-alt" alt='toggle favorites icon' src={infoIcon}/>
                </button>
                }
            </div>
            {displayLoginMessage && 
            <span className="favorites-message">{t('pleaseLogin')}</span>
            }
            {user && user?.favorites?.lenght>0 &&
            <div className="favorites-column-box">

            </div>
            }
            {user && user?.favorites?.lenght===0 &&
            <span className="favorites-message">{t('noFavorites')}</span>
            }
        </div>
    )
}

export default Favorites;