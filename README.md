# MEET-RA Video Conferencing Web Application

<p align="center">
<img src="https://user-images.githubusercontent.com/75137099/180260343-bbe226ce-a7a2-4d7b-b257-c863f0a3ce23.png" alt="Meetra-logo"/>
</p>

# Live Demo
It's an Amazing Video Conferencing Web Application build over WebRTC and Socket.io<br>
Try Live Demo on below URL.<br>
https://meet-bf2x.onrender.com
```
https://meet-bf2x.onrender.com
```

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
  - In Meet messaging/video
- **Authentication**
  - Login using gmail account.
  - Auth check in meet to **prevent unauthorized** users from entering.
<br></br>
1. Front End / Client Side
   - EJS Templetes - App state management

2. BackEnd Server:
    - For search
      - Heroku NodeJs environment - deployment.
    - For real time connections
      - Socket.io - Layer over WebSockets.
    - For video calling
      - PeerJs - Layer over webRTC
      - Heroku instance for PeerJs server deployment

3. Data Management (Databases): 
    - Firebase Firestore - Data management.
  
## Development

## Instructions

### Open Terminal
1. Clone the Repo
````
git clone https://github.com/AdityaKoshti/MEET-RA.git meetra
```` 
2. Change the directory

```
cd ./meetra
```

3. Install node dependencies 
```
npm install
```
4. Replace firebase API keys with your configurations
5. Create a `.src/serviceAccountKey.json` file 
   - Add relevant credentials
5. Run the command
```
npm run devStart
```
7. The app is now running at http://localhost:3000 


## One More Point
```
if(like the repo) {
  star_the_repo()
}
```
