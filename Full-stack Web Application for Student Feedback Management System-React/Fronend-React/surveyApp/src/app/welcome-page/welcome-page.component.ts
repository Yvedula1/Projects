// this define routes to the survey form and survey list 



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {
  names: string[] = ['Yasaswini', 'Anusha', 'Akhila', 'Akshita', 'Nikitha'];
  constructor(private router: Router) { }

  navigateToSurveyForm() {
    this.router.navigate(['/survey-form']);
  }

  navigateToSurveyList() {
    this.router.navigate(['/survey-list']);
  }
}
