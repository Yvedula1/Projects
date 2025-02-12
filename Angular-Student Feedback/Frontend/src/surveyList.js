//component serves as a UI for presenting a list of survey data fetched from an API
// offering functionalities to modify or delete individual survey entries.

import React, { useState, useEffect } from 'react';


// const ReactTable = window.ReactTable.default
//import { DataGrid } from '@mui/x-data-grid';

const InputField = ({ label, name, value, onChange, type }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type={type || "text"} id={label} name={name} value={value} onChange={onChange} required/>
    </div>
  );
};

// Example CheckboxGroup Component
const CheckboxGroup = ({ options, onChange }) => {
  return (
    <div>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={option.value}
            checked={option.isChecked}
            onChange={() => onChange(index)}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
};

const SurveyList = () => {
  // State for managing form data and submission message
  const [showSubmissionMessage, setShowSubmissionMessage] = useState(false);
  const [surveyData, setSurveyData] = useState([]);
//
useEffect(() => {
    fetch('http://localhost:8080/api/surveys/all', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      
    })
    .then((response) => response.json())
      .then((data) => {
        console.log('Survey data submitted:', data);
        setShowSubmissionMessage(true);
        setSurveyData(data);
      })
      .catch((error) => {
        console.error('Error submitting survey:', error);
      });
}, []);
const handleUpdate = (id) => {
  window.location.href = `/update/${id}`;
  
  // Logic for updating survey data with the given ID
  // Implement your update logic here
  console.log(`Update survey with ID: ${id}`);
};

const handleDelete = (id) => {
  const deleteURL = `http://localhost:8080/api/surveys/remove/${id}`;

  fetch(deleteURL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (response.ok) {
        console.log('Survey data deleted');
        // Remove the deleted survey from the surveyData state
        const updatedSurveyData = surveyData.filter((survey) => survey.id !== id);
        setSurveyData(updatedSurveyData); // Update the state
      } else {
        throw new Error('Failed to delete survey data');
      }
    })
    .catch((error) => {
      console.error('Error deleting survey:', error);
      // Handle error scenario
    });
};

  return (
    <div>
         <table>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>City</th>
                    <th>Street Address</th>

                    <th>State</th>
                    <th>Zip Address</th>
                    <th>Telephone</th>
                    <th>Email</th>
                    <th>Date of Survey</th>
                    <th>LikedAboutCampus</th>
                    <th>interestSource</th>
                    <th>Comments</th>
                    <th>Likelihood</th>
                </tr>
                {surveyData.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.firstName}</td>
                            <td>{val.lastName}</td>
                            <td>{val.city}</td>
                            <td>{val.streetAddress}</td>
                            <td>{val.state}</td>
                            <td>{val.zip}</td>
                            <td>{val.telephoneNumber}</td>
                            <td>{val.email}</td>
                            <td>{val.dateOfSurvey}</td>
                            
                            <td>{val.likedAboutCampus}</td>
                            <td>{val.interestSource}</td>
                            <td>{val.additionalComments}</td>
                            <td>{val.likelihoodToRecommend}</td>
                            <td>
                 
                  <button onClick={() => handleUpdate(val.id)}>Update</button>
                 
                  <button onClick={() => handleDelete(val.id)}>Delete</button>
                </td>
                        </tr>
                    )
                })}
            </table>
    </div>
  );
};


export default SurveyList;