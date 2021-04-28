// Create a person having this prototype:
const mongoose=require('mongoose')
const Schema = mongoose.Schema
const User = new Schema({
  name: {
    type: String,
  },
  age: {
    type:Number, 
},
  email: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
});
 
module.exports=mongoose.model("UserModel",User);



