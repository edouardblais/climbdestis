/* eslint-disable react/prop-types */
import { FC } from 'react';
import {useTranslation} from "react-i18next";
import './ToggleLanguage.css';

interface ToggleLanguageProps {
    justify: string;
    classname: string;
}

const ToggleLanguage:FC<ToggleLanguageProps> = ({justify, classname}) => {
    const [,i18n] = useTranslation();

    const changeLanguage = () => {
        if (i18n.language.startsWith('fr')) {
            i18n.changeLanguage('en')
        } else if (i18n.language.startsWith('en')) {
            i18n.changeLanguage('fr')
        } else {
            i18n.changeLanguage('en')
        }
    }

    return (
        <div style={{justifyContent:justify}} className={classname}>
            <button type='button' className="translate-btn" onClick={changeLanguage}>{i18n.language.startsWith('fr')?'En':'Fr'}</button>
        </div>
    )
}

export default ToggleLanguage;