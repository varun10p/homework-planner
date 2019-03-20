const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  


});







const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  datecreated: {
    type: Date,
    default: Date.now
  },
  userprojects: [ProjectSchema]
});


 
const User = mongoose.model('User', UserSchema);

module.exports = User;