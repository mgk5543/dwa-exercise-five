const express = require('express')
const firebase = require("firebase/app")
const app = express()
// Setting port - dynamically with Heroku
const port = process.env.PORT || 4000

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqmt4UpMxeMezI-sp_KsAoIzl-_fRWSVI",
  authDomain: "dwa-exercise-five-megankim.firebaseapp.com",
  projectId: "dwa-exercise-five-megankim",
  storageBucket: "dwa-exercise-five-megankim.appspot.com",
  messagingSenderId: "260615640045",
  appId: "1:260615640045:web:138fd2a75e75f15cae0de4"
};

firebase.initializeApp(firebaseConfig)

const indexRoute = require('./routes/index.js')
const singlePostRoute = require("./routes/singlePost.js")
const createPostRoute = require("./routes/createPost.js")

app.use("/", indexRoute)
app.use("/post", singlePostRoute)
app.use("/create", createPostRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})