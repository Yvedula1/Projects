//This SurveyForm component represents a form to collect survey data. 
//It utilizes React's state and event handling to manage form inputs and submission



import React, { useState } from 'react';


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

const SurveyForm = () => {
  // State for managing form data and submission message
  const defaultSurveyData = {
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state:'',
    zip: '',
    telephoneNumber: '',
    email: '',
    dateOfSurvey: null,
    likesOptions: [
      {
        isChecked: false,
        value: 'sports',
        label: 'Sports'
      },
      {
        isChecked: false,
        value: 'location',
        label: 'Location'
      },
      {
        isChecked: false,
        value: 'campus',
        label: 'campus'
      },
      {
        isChecked: false,
        value: 'atmosphere',
        label: 'Atmosphere'
      },
      {
        isChecked: false,
        value: 'dormRooms',
        label: 'Dorm Rooms'
      }
    ],
    interestSource: '',
    interestSourceStr: '',
    additionalComments:'',
    likelihoodToRecommend: 'Very Likely',

    
  };
  const [showSubmissionMessage, setShowSubmissionMessage] = useState(false);
  const [surveyData, setSurveyData] = useState({...defaultSurveyData});

  const handleInputChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setSurveyData({ ...surveyData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e) => {
    setSurveyData({ ...surveyData, interestSource: e.target.id });
  };

  const handleCheckboxChange = (index) => {
    const updatedOptions = [...surveyData.likesOptions];
    updatedOptions[index].isChecked = !updatedOptions[index].isChecked;
    setSurveyData({ ...surveyData, likesOptions: updatedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSubmissionMessage(false);


    // Process data similar to Angular logic
    const likedAboutCampus = surveyData.likesOptions
      .filter((option) => option.isChecked)
      .map((option) => option.value)
      .join(',');


    // Send data to the backend
    fetch('http://localhost:8080/api/surveys/newStudent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...surveyData, likedAboutCampus }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Survey data submitted:', data);
        setShowSubmissionMessage(true);
        setSurveyData({
         ...defaultSurveyData,
          // ... other form fields
        });
      })
      .catch((error) => {
        console.error('Error submitting survey:', error);
      });
  };

  return (
    <div className="form-container">
<h1 className="form-heading">Survey Form</h1>
    <form onSubmit={handleSubmit}>
      <InputField
        label="First Name"
        name="firstName"
        value={surveyData.firstName}
        onChange={handleInputChange}
      />
       <InputField
        label="Last Name"
        name="lastName"
        value={surveyData.lastName}
        onChange={handleInputChange}
      /> 
       <InputField
        label="streetAddress"
        name="streetAddress"
        value={surveyData.streetAddress}
        onChange={handleInputChange}
      /> 
      <InputField
        label="city"
        name="city"
        value={surveyData.city}
        onChange={handleInputChange}
      /> 
      <InputField
        label="state"
        name="state"
        value={surveyData.state}
        onChange={handleInputChange}
      /> 
      <InputField
        label="zip"
        name="zip"
        value={surveyData.zip}
        onChange={handleInputChange}
      /> 
      <InputField
        label="telephoneNumber"
        name="telephoneNumber"
        value={surveyData.telephoneNumber}
        onChange={handleInputChange}
      /> 
      <InputField
        label="email"
        name="email"
        value={surveyData.email}
        onChange={handleInputChange}
      /> 
      <InputField
        label="dateOfSurvey"
        name="dateOfSurvey"
        value={surveyData.dateOfSurvey}
        onChange={handleInputChange}
        type="date"
      /> 
      <div>
      <label>What did you like most about the campus?</label>
      <CheckboxGroup
        options={surveyData.likesOptions}
        onChange={handleCheckboxChange}
      />
      </div>
      <label>How Became Interested <span class="required-field">*</span></label><br />
      <div class="inline">
       
        
      <InputField
        label="friends"
        name="interestSource"
        value={surveyData.interestSource ==="friends"}
        onChange={handleRadioChange}
        type="radio"
      /> 
      
        <InputField
        label="television"
        name="interestSource"
        value={surveyData.interestSource === "television"}
        onChange={handleRadioChange}
        type="radio"
      /> 
        
        <InputField
        label="internet"
        name="interestSource"
        value={surveyData.interestSource === "internet"}
        onChange={handleRadioChange}
        type="radio"
      /> 
        <InputField
        label="other"
        name="interestSource"
        value={surveyData.interestSource === "other"}
        onChange={handleRadioChange}
        type="radio"
      /> 
      </div>
      <div>
    <label>Likelihood of recommending this school:</label>
    <select name="likelihoodToRecommend" id="likelihood" onChange={handleInputChange} > 
      <option value="Very Likely">Very Likely</option>
      <option value="Likely">Likely</option>
      <option value="Unlikely">Unlikely</option>
    </select>
  </div>
  <div>
  <InputField
  label="additionalComments"
 name="additionalComments"
  value={surveyData.additionalComments}
  onChange= {handleInputChange}
  type="textarea"
/>
</div>
      
      {showSubmissionMessage && (
        <div className="submission-message">Thanks for your submission!</div>
      )}
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default SurveyForm;
