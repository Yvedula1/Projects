import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyListComponent } from './survey-list/survey-list.component'; 
//import { SurveyFormComponent } from './survey-form/survey-form.component';
//import { SurveyListComponent } from './survey-list/survey-list.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    WelcomePageComponent,
    SurveyFormComponent,
    SurveyListComponent

  ],
  providers: [
    provideHttpClient().withFetch(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }