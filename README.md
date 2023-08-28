# Setup
1. cd into server directory
2. run node server.js - this starts the server
3. cd into client directory 
4. run npm start - this starts the client
Note: On first run, must also run "npm install" command in BOTH the client directory and the server directory before running the commands above.

# Information About Software Project 
1. **Introduction:**
The web application is a website made for customers' use, which are governments and local councils. The purpose of the website is to provide a high level management platform for the governments to observe the current waste status of their area, observe the current responses, and be informed of data-driven insights and reports.
- It is important to choose the right architecture for this system because
- It must be scalable over multiple areas, customers and jurisdictions around the world
- It must use a map which is easy to read and cheap to use, any paid apis used must have limited calls made to them
- It must be cyber secure
- The database choice must be able to take in insert requests from multiple devices at the same time and from different locations.
- It must have infrastructure to be able to interface with a mobile application, because a separate but linked mobile application will be developed after the website is built.

2. **Project Requirements and Goals:**
  Functional
- The website must be deployed and hosted on the internet
- User Authentication
- User Account Management
- Interactive Map
- Analytics and Reports
- Dashboard
- Cleaner and Job Management
- User Interface Language Changes


  Non-Functional
- Cyber Security - HTTPS and prevents common security threats
- Scalability - architecture accommodates for potential growth in users and data volume
- Performance - reasonable response times
- Availability - high availability application
- Data integrity and consistency - database should maintain its integrity
- UX - user friendly
- Maintenance and Support - code should be easily read and documented correctly
- Compliance - adhere to data protection and GDPR
- Compatibility - most modern web browsers are supported
- Testing - multiple levels of testing


3. **Architecture Overview:**
Front-end website

Database (initially locally hosted, then cloud hosted)

Camera units (send data to REST API, to then send to the database)

Back-end (websites brain and algorithm creation)

REST API (intermediary between all the different components)
