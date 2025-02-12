import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-survey-list',
  standalone: true,
  templateUrl: './survey-list.component.html',
  imports: [ HttpClientModule, CommonModule],
 
  styleUrls: ['./survey-list.component.css']
  
})
export class SurveyListComponent implements OnInit {
  surveys: any[] = []; 
  private backendURL = 'http://localhost:8080/api/surveys/all';
  
  constructor(private http: HttpClient,private router: Router) {}
  ngOnInit() {
    this.fetchSurveyData();
  }

  fetchSurveyData() {
    this.http.get<any[]>(`${this.backendURL}`).subscribe(
      (response) => {
        this.surveys = response;
        console.log('Retrieved survey data:', this.surveys);
      },
      (error) => {
        console.error('Error fetching survey data:', error);
      }
    );
  }
  deleteForm(surveyId: number) {
      const deleteURL = `  http://localhost:8080/api/surveys/remove/${surveyId}`; 
      this.http.delete(deleteURL)
        .subscribe(
          () => {
            console.log('Survey data deleted');
            this.fetchSurveyData();
            
          },
          (error) => {
            console.error('Error deleting survey:', error);
            // Handle error scenario
          }
        );
    }
    goToUpdateForm(surveyId: number) {
      this.router.navigate(['/update-form', surveyId]);
    }
}
