package com.gmu.hw.survey.model;

import jakarta.persistence.*;

import java.util.Date;


@Entity
@Table(name = "surveys")
public class SurveyModel {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name="first_name")
        private String firstName;

        @Column(name="last_name")
        private String lastName;

        @Column(name="street_address")
        private String streetAddress;

        @Column(name="city")
        private String city;

        @Column(name="state")
        private String state;

        @Column(name="zip")
        private String zip;

        @Column(name="telephone_number")
        private String telephoneNumber;

        @Column(name="email")
        private String email;

        @Column(name="dos")
        private Date dateOfSurvey;


        @Column(name = "liked_about_campus")
        private String likedAboutCampus;

        @Column(name = "interest_source")
        private String interestSource;

        @Column(name = "likelihood_To_Recommend")
        private String likelihoodToRecommend;

        @Column(name = "additional_comments",length = 10000)
        private String additionalComments;
       public String[] getLikesArray() {
            if (likedAboutCampus != null && !likedAboutCampus.isEmpty()) {
                return likedAboutCampus.split(", ");
            } else {
                return new String[0]; // Return an empty array or handle null/empty case as needed
            }
        }
    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDateOfSurvey() {
        return dateOfSurvey;
    }

    public void setDateOfSurvey(Date dateOfSurvey) {
        this.dateOfSurvey = dateOfSurvey;
    }

    public String getLikedAboutCampus() {
        return likedAboutCampus;
    }

    public void setLikedAboutCampus(String likedAboutCampus) {
         System.out.println("Liked About Campus: " + likedAboutCampus);
        this.likedAboutCampus = likedAboutCampus;
    }
    

    public String getInterestSource() {
        return interestSource;
    }

    public void setInterestSource(String interestSource) {
        this.interestSource = interestSource;
    }

    public String getLikelihoodToRecommend() {
        return likelihoodToRecommend;
    }

    public void setLikelihoodToRecommend(String likelihoodToRecommend) {
        this.likelihoodToRecommend = likelihoodToRecommend;
    }

    public String getAdditionalComments() {
        return additionalComments;
    }

    public void setAdditionalComments(String additionalComments) {
        this.additionalComments = additionalComments;
    }
   
}

