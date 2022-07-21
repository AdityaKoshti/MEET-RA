# MEET-RA Video Conferencing Web Application


# Live Demo
# Preview
## Table of content
  - [Features](#features)
  - [TechStack](#techstack)
  - [Development](#development)
## Features
- **One to One and Room Group Messaging**
  - Going to implement.
- **Video conferencing**
  - One to One and group calls
  - In Meet messaging
- **Authentication**
  - Login using gmail account.
  - Auth check in meet to **prevent unauthorized** users from entering.
<br></br>
1. Front End / Client Side
   - EJS Templetes - App state management
2. BackEnd Server:
    - For search
      - Heroku NodeJs environment - deployment.
    - For video calling
      - PeerJs - Layer over webRTC
      - Heroku instance for PeerJs server deployment

3. Data Management (Databases): 
    - Firebase Firestore - Data management and messaging
## Development

## Instructions


1. `git clone https://github.com/AdityaKoshti/MEET-RA.git meetra` 
2. `cd ./meetra`
3. Install node dependencies 
   - `npm install`
4. Replace firebase API keys with your configurations
5. Create a `.env` file 
   - Add relevant credentials
   - `cp .env.example .env` 
5. `npm run devStart`
6. The app is now running at http://localhost:3000 
