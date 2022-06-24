const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
const {signin, signup} = require('./src/index')
// import {initializeApp} from 'firebase/app';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';


// const firebaseConfig = {
//     apiKey: "AIzaSyC3tSdioRbcufHh0oIo67bwqDw8k8fVgT8",
//     authDomain: "meet-5bfa8.firebaseapp.com",
//     projectId: "meet-5bfa8",
//     storageBucket: "meet-5bfa8.appspot.com",
//     messagingSenderId: "796528308032",
//     appId: "1:796528308032:web:c098b86fcee4587af4d4a5",
//     measurementId: "G-M8SGE5F06J"
// };

// //Initialise firebase
// const webapp = initializeApp(firebaseConfig);
// const auth = getAuth(webapp);


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('signin')
  // res.redirect(`/${uuidV4()}`)
})

app.get('/signin' , (req, res) => {
  res.render('signin')
})

app.get('/signup' , (req, res) => {
  res.render('signup')
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

app.post('/signup', (req, req) => {
  var email = req.body.email;
  var password = req.body.password;
  signin(email, password);
})

app.post('signin', (res, req) => {
  // // Sign In
  // signInWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  // });
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId)
    })
  })
})

server.listen(3000)