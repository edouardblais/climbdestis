/* eslint-disable react/prop-types */
import {useTranslation} from "react-i18next";
import './ToggleLanguage.css';

function ToggleLanguage({showSidebar}) {
    const [,i18n] = useTranslation();

    const changeLanguage = () => {
        if (i18n.language==='fr') {
            i18n.changeLanguage('en')
        } else if (i18n.language==='en') {
            i18n.changeLanguage('fr')
        }
    }

    return (
        <div style={{justifyContent:showSidebar?'flex-end':'center', paddingRight:showSidebar?'5px':'0px'}} className="translate-btn-box">
            <button type='button' className="translate-btn" onClick={changeLanguage}>{i18n.language==='fr'?'En':'Fr'}</button>
        </div>
    )
}

export default ToggleLanguage;