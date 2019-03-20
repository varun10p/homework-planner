const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  recipient: String,
  


});


const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duedate: {
    type: String,
    required: true
  },
  datecreated: {
    type: Date,
    default: Date.now
  },
  creator:{
    type:String,
    required: true
  },
  projecttasks: [TaskSchema]
});


 
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;