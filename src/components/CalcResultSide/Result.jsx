import React, { useEffect, useState } from 'react';
import './Result.css';

const Result = ({ resText }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [resultText, setResultText] = useState('Results will be here.....');

    useEffect(()=>{
        if(resText){
            setResultText(resText);
        }
    },[resText]);

    return (
        <div className={`result ${isOpen ? 'open' : ''}`}>
            <div className="result-header" onClick={() => setIsOpen(!isOpen)}>
                <button className="result-toggle-button">{isOpen ? 'X' : 'O'}</button>
                <span>RESULTS</span>
            </div>
            {isOpen && (
                <div className="result-body">
            
                </div>
            )}
        </div>
    );
};

export default Result;
