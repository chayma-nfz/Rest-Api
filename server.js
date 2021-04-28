const express = require('express');
const { Model } = require('mongoose');
const app =express();
const connectDB =require('./config/connectDB')
//connect the database 
connectDB();
//  Create the Schema
const User = require('./models/User');
//Body Parser
app.use(express.json());


// GET 
app.get("/api/users", (req, res) => {
  User.find()
    .then((user) => res.send({ msg: "All users", user}))
    .catch((err) => res.send({ msg: "Cannot get users", err }));
});

//  POST 
app.post("/api/users", (req, res) => {
  const { name, age, email, phoneNumber } = req.body;
  const user = new User({ name, age, email, phoneNumber });
  user
    .save()
    .then((newUser) => res.send({ msg: "User added successfully!", newUser }))
    .catch((err) => res.send({ msg: "Adding user failed!", err }));
});

//  Put

app.put("/api/users/:userId", (req, res) => {
  const id = req.params.userId;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedUser) =>
      res.send({ msg: "the user is updated", updatedUser })
    )
    .catch((err) => res.send({ msg: "edit error", err }));
});

//DELETE 
app.delete("/api/users/:userId", (req, res) => {
  const id = req.params.userId;
  User.findByIdAndRemove(id)
    .then((user) => {
      if (!user) {
        return res.send({ msg: "user not found" });
      }
      res.send({ msg: "user deleted with success", user });
    })

    .catch((err) => res.status(400).send({ msg: "delete error", err }));
});

//connect the server
app.listen(4000, (err)=>{
    if (err) console.log("Server is not running");
    else console.log("Server is running on port 4000");
});