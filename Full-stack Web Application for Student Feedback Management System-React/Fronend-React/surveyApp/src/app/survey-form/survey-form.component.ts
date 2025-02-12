// Allowing users to submit survey data
// sends the data to a specified backend endpoint upon form submission.




import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule ,HttpHeaders} from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {
  showSubmissionMessage = false;
  surveyForm: FormGroup;
  private backendURL = 'http://localhost:8080/api/surveys/newStudent';
  likesOptions = [
    {
      value: 'sports',
      label: 'Sports',
      isChecked: false
    },
    {
      value: 'location',
      label: 'Location',
      isChecked: false
    },
    {
      value: 'campus',
      label: 'Campus',
      isChecked: false
    },
    {
      value: 'atmosphere',
      label: 'Atmosphere',
      isChecked: false
    },
    {
      value: 'dormRooms',
      label: 'Dorm Rooms',
      isChecked: false
    },
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.surveyForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      telephoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      dateOfSurvey: ['', Validators.required],
      likedAboutCampus: this.fb.array([]), 
      likesOptions: this.fb.array(
        this.likesOptions.map(x => false)
      ),

      interestSource: ['', Validators.required],
      likelihoodToRecommend: ['', Validators.required],
      additionalComments: [''],
    });
  }

  ngOnInit(): void {
    this.surveyForm.value.likesOptions = [false, false, false, true, false];
    console.log(this.surveyForm);

  }
  

  submitForm() {
    this.showSubmissionMessage = false;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.surveyForm.value.likedAboutCampus = '';

    for (var i = 0; i < this.likesOptions.length; i++)
    {
      if (this.surveyForm.value.likesOptions[i] == true){
        if (this.surveyForm.value.likedAboutCampus == ''){
          this.surveyForm.value.likedAboutCampus = this.likesOptions[i].value;
        } else {
        this.surveyForm.value.likedAboutCampus += ',' + this.likesOptions[i].value;        
      }
    }
    }

    console.log(this.likesOptions)
    console.log(this.surveyForm.value.likes);
    console.log(this.surveyForm);
    const atLeastOneCheckboxChecked = this.surveyForm.value.likedAboutCampus != '';//.some((value: string) => value);
    console.log(atLeastOneCheckboxChecked);


  
    this.http.post(this.backendURL,  this.surveyForm.value, { headers })
      .subscribe(
        (response) => {
          console.log('Survey data submitted:', response);
          this.showSubmissionMessage = true;
          this.surveyForm.reset(); 
        },
        (error) => {
          console.error('Error submitting survey:', error);
        }
      );
  }
  cancelForm() {
    this.surveyForm.reset();
  }
}