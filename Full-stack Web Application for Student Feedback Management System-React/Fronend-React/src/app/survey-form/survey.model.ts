export interface SurveyModel {
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
    telephoneNumber: string;
    email: string;
    dateOfSurvey: string; // Consider using a Date type if appropriate
    likedAboutCampus: string; // Assuming an array of booleans for checkboxes
    interestSource: string;
    likelihoodToRecommend: string;
    additionalComments: string;
  }
  