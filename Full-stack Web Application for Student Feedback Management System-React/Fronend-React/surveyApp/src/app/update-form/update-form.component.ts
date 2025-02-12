// for updating survey information, dynamically populating a form with existing data and handling the submission of modified survey details back to the backend for updates.


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule ,HttpHeaders} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-form',
  standalone:true,
  templateUrl: './update-form.component.html',
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {
  //showSubmissionMessage = false;
  surveyForm: FormGroup;
  //private backendURL = 'http://localhost:8080/api/surveys/newStudent';
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
  surveyID: any;
   private backendURL = 'http://localhost:8080/api/surveys/student';
  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.surveyID = +params['surveyId'];
      this.fetchSurveyData(this.surveyID);
    });
  }

  fetchSurveyData(surveyId: number) {
    this.http.get<any>(`${this.backendURL}/${surveyId}`).subscribe(
      (response) => {
        response.likesOptions = [];
        var allLiked = response.likedAboutCampus.split(",");
        for (var i = 0; i < this.likesOptions.length; i++){
          let found = false;
            for (var j = 0 ; j < allLiked.length; j++) {
              if (this.likesOptions[i].value == allLiked[j]){
                found = true;
                break;
              }
            }
          response.likesOptions.push(found);
        }
        response.likesOptions = this.fb.array(response.likesOptions)
        this.surveyForm = this.fb.group(response);

        console.log('Retrieved survey data:', this.surveyForm.value)
        
      },
      (error) => {
        console.error('Error fetching survey data:', error);
      }
    );
  }
  submitForm() {
    //this.showSubmissionMessage = false;
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


  
    this.http.put(`http://localhost:8080/api/surveys/oldStudent/${this.surveyID}`,  this.surveyForm.value, { headers })
      .subscribe(
        (response) => {
          console.log('Survey data submitted:', response);
          //this.showSubmissionMessage = true;
        },
        (error) => {
          console.error('Error submitting survey:', error);
        }
      );
  }
  
  }
 
