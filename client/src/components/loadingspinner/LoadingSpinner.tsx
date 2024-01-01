import { FC } from 'react';
import { RotatingLines } from "react-loader-spinner";
import './LoadingSpinner.css';

const LoadingSpinner:FC = () => {
    return (
        <div className="loading-spinner-box">
            <RotatingLines
                strokeColor="#004EA4"
                strokeWidth="5"
                animationDuration="0.75"
                width="40"
            />
        </div>
    )
}

export default LoadingSpinner;