# Overview
This project is a career platform that allows candidates to search for jobs filtered by cities, complete a form, and upload their CVs. The platform consists of a frontend application built with Angular and a backend application built with Spring Boot. The frontend is hosted on AWS EC2, while CVs are stored in AWS S3, and notifications are sent via AWS SNS. The backend uses AWS RDS (MySQL) for database management.

# Career Opportunities

The frontend of the career platform is built using Angular and hosted on an EC2 instance. It provides a user-friendly interface for job seekers to search for job opportunities by city, fill out application forms, and upload their CVs.

## Features

Job search with city filters.
Candidate application form submission.
CV upload functionality.
Email notifications upon successful application submission.

## Setup

Ensure you have Angular CLI version 17.3.5 installed globally:
````npm install -g @angular/cli@17.3.5````

Use Node Version Manager (nvm) to set Node.js version:
````nvm install 20.10.0````
````nvm use 20.10.0````

Install dependencies:
````npm install````

Start the application:
````npm start````

