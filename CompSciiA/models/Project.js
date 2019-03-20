const mongoose = require('mongoose');
//Task object
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  recipient: String,
  


});

//Project object
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


//Only exports the project although the task schema is still saved.
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
