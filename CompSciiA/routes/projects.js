const express = require('express');
const router = express.Router();

let Project = require('../models/Project');
let User = require('../models/User');
//Sends user object to the page
router.get('/add', ensureAuthenticated, function (req, res) {
  res.render('add_project', {
    user: req.user
  });
});
//Adds the data to the database and sends errors
router.post('/add', function (req, res) {

  let errors = [];
  const { title, description, duedate } = req.body;
  if (!title || !description || !duedate) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (errors.length > 0) {
    res.render('add_project', {
      user: req.user,
      errors
    });
  } else {
    let project = new Project();
    project.title = req.body.title;
    project.description = req.body.description;
    project.duedate = req.body.duedate;
    project.creator = req.user._id;



//Redirects back to the list of projects
    project.save(function (err) {
      if (err) {
        console.log(err);
        return;
      } else {
        req.flash(
          'success_msg',
          'Project Created'
        );
        res.redirect('/projects/list');

      }
    });
  }
});
//Gets all the appropriate project objects from the database
router.get('/list', ensureAuthenticated, function (req, res) {
  Project.find({}, function (err, projects) {
    if (err) {
      console.log(err);
    } else {
      res.render('myprojects', {
        user: req.user,
        projects: projects


      });
    }
  });
});
//Edit route
router.get('/edit/:id', ensureAuthenticated, function (req, res) {
  Project.findById(req.params.id, function (err, project) {
    if (project.creator != req.user._id) {
      req.flash('danger', 'Not Allowed');
      res.redirect('/');
    }
    res.render('edit_project', {
      user: req.user,
      project: project
    });
  });
});

router.post('/edit/:id', function (req, res) {
  let project = {};
  project.title = req.body.title;
  project.description = req.body.description;
  project.duedate = req.body.duedate;

  let query = { _id: req.params.id };

  Project.update(query, project, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash('success_msg', 'Updated');
      res.redirect('/projects/list');
    }
  });
});
// Deletes the selected project
router.post('/delete/:id', function (req, res) {
  if (!req.user._id) {
    res.status(500).send();
  }
  let query = { _id: req.params.id };

  Project.findById(req.params.id, function (err, project) {
    if (project.creator != req.user._id) {
      res.status(500).send();
    } else {
      Project.deleteOne(query, function (err) {
        if (err) {
          console.log(err);
        }
        req.flash('success_msg', 'Deleted');
        res.redirect('/projects/list');
      });
    }
  });
});
//Add task post route
router.post('/addtask/:id', function (req, res) {
  const task = { title, description, recipient } = req.body;
  let query = { _id: req.params.id };
  if (!title || !description || !recipient) {
    req.flash('error', 'Fill in all fields');
    res.redirect('/projects/list');
  } else {
    Project.findOneAndUpdate(
      { _id: query },
      { $push: { projecttasks: task } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          req.flash('success_msg', 'Task Added');
          res.redirect('/projects/list');
        }
      });
  }






});

//Views a single project
router.get('/:id', ensureAuthenticated, function (req, res) {
  Project.findById(req.params.id, function (err, project) {
    res.render('project', {
      user: req.user,
      project: project

    });
  });
});
//Checks to see if user is logged in, otherwise it sends an error
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}
  
module.exports = router;
