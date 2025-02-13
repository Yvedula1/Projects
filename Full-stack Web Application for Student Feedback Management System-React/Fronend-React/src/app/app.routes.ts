// Angular routing setup and configuration


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateFormComponent } from './update-form/update-form.component';

export const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'survey-form', component: SurveyFormComponent },
  { path: 'survey-list', component: SurveyListComponent} ,
  {path: 'update-form/:surveyId', component: UpdateFormComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes), HttpClientModule],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }