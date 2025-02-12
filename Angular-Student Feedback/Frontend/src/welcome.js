import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    const names = ['Yasaswini', 'Akhila', 'Anusha', 'Akshitha', 'Nikihila']; 
    return (
        <div>
            <h1>Hi, Welcome!</h1>
            <h2>Welcome to SWE 642 Assignment 4. You can redirect to surveyForm and List of all surveys by using below buttons.</h2>
            <p>Project Members:</p>
            <div>
                {names.map((name, index) => (
                    <p key={index}>{name}</p>
                ))}
            </div>
            <div style={{ marginTop: '20px' }}>
                <Link to="/surveyform">
                    <button style={{ marginRight: '10px' }}>Go to Survey Form</button>
                </Link>
                <Link to="/surveylist">
                    <button>Go to Survey List</button>
                </Link>
            </div>
        </div>
    );
};

export default WelcomePage;
