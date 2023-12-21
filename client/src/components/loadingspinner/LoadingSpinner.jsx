import { RotatingLines } from "react-loader-spinner";
import './LoadingSpinner.css';

function LoadingSpinner() {
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