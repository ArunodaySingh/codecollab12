const express=require("express");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const path = require("path");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./src/utils/users");

const PORT = process.env.PORT || 8000;

let server = http.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const publicDirectoryPath = path.join(__dirname, "/public");

app.use(express.static(publicDirectoryPath));

app.get("/jobs", (req,res)=>{
  return res.render('job',{
      title:"Home Page"
  });
});

app.get("/books", (req,res)=>{
  return res.render('books',{
      title:"Home Page"
  });
});

app.get("/codetogether", (req,res)=>{
  return res.render('job',{
      title:"Home Page"
  });
});

app.get("/dashboard", (req,res)=>{
  return res.render('job',{
      title:"Home Page"
  });
});



io.on("connection", (socket) => {
  console.log("User Joined");



  // updating html code to users in room
  socket.on("htmlCode", (val1) => {
    // const user = getUser(socket.id);
    //
    io.emit("htmlCode", val1);

  });

  // updating css code to users in room
  socket.on("cssCode", (val2) => {
  io.emit("cssCode", val2);
  });

  // updating js code in users in room
  socket.on("jsCode", (val3) => {
    io.emit("jsCode", val3);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
    // const user = removeUser(socket.id);
    //
    // if (user) {
    //   // io.emit('you are done')
    // }
  });
});
