import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router';

const InputField = ({ label, name, value, onChange, checked, type }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type={type || "text"} id={label} name={name} value={value} checked={checked} onChange={onChange} required/>
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

const Update = (props) => {
  console.log(props);
  const {id} = useParams();
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
    interestSource: " ",
   interestSource1: true,
    additionalComments:'',
    likelihoodToRecommend: 'Very Likely',

    // ... other form fields
  };
  const [showSubmissionMessage, setShowSubmissionMessage] = useState(false);
  const [surveyData, setSurveyData] = useState({...defaultSurveyData});

  useEffect(() => {
//     const search = useLocation().search;
// const id=new URLSearchParams(search).get("id");
// console.log(id);

fetch('http://localhost:8080/api/surveys/student/' + id, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      let date = new Date(data.dateOfSurvey);
      let dateMDY = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      console.log(data);
      data.dateOfSurvey = new Date(data.dateOfSurvey);
      let likesOptions = defaultSurveyData.likesOptions;
      // console.log(likesOptions);
      // console.log(data.likedAboutCampus);
      // console.log(data.likedAboutCampus.split(','));
      const radioValue = data.interestSource; 
      const splitStr = data.likedAboutCampus.split(',');
      data.dateOfSurvey = new Date(data.dateOfSurvey);
      for(var index in likesOptions) {
        var option = likesOptions[index];
        // console.log(option);
        for (var row in splitStr) {
            if (option.value == splitStr[row]) {
                option.isChecked = true;
                break;
            }
        }
    }
    console.log(likesOptions);
    data.likesOptions = likesOptions;
    console.log(data.interestSource);
      setSurveyData({
       ...data,
       dateOfSurvey: dateMDY,
       interestSource: radioValue || 'friends', 
        // ... other form fields
      });
    })
    .catch((error) => {
      console.error('Error submitting survey:', error);
    });
  }, [])

  const handleInputChange = (e) => {
    setSurveyData({ ...surveyData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = e => {
    console.log("Radio clicked!", e.target.value);
    setSurveyData({...surveyData, interestSource: e.target.value});  
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
    fetch('http://localhost:8080/api/surveys/oldStudent/' + id, {
      method: 'PUT',
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
      <CheckboxGroup
        options={surveyData.likesOptions}
        onChange={handleCheckboxChange}
      />
      <div>
  <label>How Became Interested <span class="required-field">*</span></label><br />
  
  <div class="inline">

    <InputField
      label="friends"
      name="interestSource"
      value="friends"
      checked={surveyData.interestSource === "friends"}
      onChange={handleRadioChange}
      type="radio"
    />

    <InputField
      label="television"
      name="interestSource"  
      value="television"
      checked={surveyData.interestSource === "television"}
      onChange={handleRadioChange}
      type="radio"
    />
    
    <InputField
      label="internet"
      name="interestSource"    
      value="internet"
      checked={surveyData.interestSource === "internet"}
      onChange={handleRadioChange}
      type="radio"
    />
    
    <InputField
      label="other"
      name="interestSource"
      value="other"
      checked={surveyData.interestSource === "other"}
      onChange={handleRadioChange} 
      type="radio"
    />

  </div>
</div>
      <div>
    <label>Likelihood of recommending this school:</label>
    <select name="likelihoodToRecommend" id="likelihood" onChange={handleInputChange} value={surveyData.likelihoodToRecommend}> 
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
        <div className="submission-message">Thanks for your Updating!</div>
      )}
      <button type="submit">Update</button>
    </form>
  );
};

export default Update;