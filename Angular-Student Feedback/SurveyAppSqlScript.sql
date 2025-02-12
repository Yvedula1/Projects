CREATE TABLE sys.surveys (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) ,
    last_name VARCHAR(255) ,
    street_address VARCHAR(255) ,
    city VARCHAR(255) ,
    state VARCHAR(255) ,
    zip VARCHAR(20) ,
    telephone_number VARCHAR(20) ,
    email VARCHAR(255) ,
    dos DATE ,
    liked_about_campus varchar(1000) ,
    interest_source VARCHAR(1000),
    likelihood_to_recommend VARCHAR(255) ,
    additional_comments VARCHAR(10000)
);

INSERT INTO sys.surveys (first_name, last_name, street_address, city, state, zip, telephone_number, email, dos, liked_about_campus, interest_source, likelihood_to_recommend, additional_comments) 
VALUES 
('John', 'Doe', '123 Main St', 'Anytown', 'CA', '12345', '555-123-4567', 'john@example.com', '2023-11-01', 'Beautiful campus and friendly atmosphere', 'Website', 'Highly likely', 'Great experience overall!'),
('Jane', 'Smith', '456 Elm St', 'Otherville', 'NY', '67890', '555-987-6543', 'jane@example.com', '2023-11-05', 'Great facilities and engaging professors', 'Friend referral', 'Likely', 'Could improve parking options.'),
('Alex', 'Johnson', '789 Oak St', 'Sometown', 'TX', '54321', '555-555-5555', 'alex@example.com', '2023-11-10', 'Diverse student body and excellent extracurriculars', 'Social media', 'Highly likely', 'No complaints, fantastic experience!'),
('Emily', 'Williams', '101 Pine St', 'Cityville', 'FL', '98765', '555-222-3333', 'emily@example.com', '2023-11-15', 'Supportive staff and great career services', 'Campus event', 'Very likely', 'Could use more study areas.');

select * from sys.surveys;