/* eslint-disable react/prop-types */
import './Results.css';

function Results({results}) {
    return (
        <div className='sidebar-content-box'>
            {results.map((result) => (
                <div className='sidebar-column-box' key={result.id}>
                    <h2 className='sidebar-destination-name'>{result.destination}</h2>
                    <h3 className='sidebar-destination-area'>{result.area}, {result.region}, {result.country}</h3>
                </div>
            ))}
        </div>
    )
}

export default Results;