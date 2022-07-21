const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const ejs = require('ejs');

const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')


app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth')
const admin = require('firebase-admin')
const credentials = require('./src/serviceAccountKey.json');
const { get } = require('https');


admin.initializeApp({
  credential: admin.credential.cert(credentials)
})


var Id = 0;

app.get("/", (req, res) => {
  // const signedUser = admin.auth().
  res.render('signup')
  // res.redirect(`/${uuidV4()}`)
})


app.post("/", (req, res) => {

  var joinId = req.body.meetid;
  res.redirect("/"+joinId);
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})


// SignUp by creating new user.

app.post('/signup', async (req, res) => {
  const mail = req.body.email;
  const pass = req.body.password;


    const userResponse = await admin.auth().createUser({
      email: mail,
      password: pass,
      emailVerified: false,
      disabled: false 
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      // console.log('Successfully created new user:', userRecord);
      Id = uuidV4();
      res.render('home', { roomId: Id });
  
      // res.json({success: true});
    })
    .catch((error) => {
      const errorMessage = 'auth/email-already-exists';
      if(error.code === errorMessage){
        Id = uuidV4();
        res.render('home', { roomId: Id });
      }else{
        console.log('Error creating new user:', error);
        res.render('signup');
      }
    });

})



io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId)
    // messages
    socket.on("message", async ({ message, user }) => {
      //send message to the same room
      console.log(user);
      let messageResp = await createMessage(user, message, roomId);
      io.to(roomId).emit("createMessage", { message: messageResp, user });
    });

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId)
    })
  })
})

server.listen(3000)