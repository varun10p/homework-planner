//Require the dependencices from package.json

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();


require('./config/passport')(passport);

const db = require('./config/keys').MongoURI;

//Access mongodb database
mongoose.connect(db,{ useNewUrlParser: true }).then(() => console.log('DB connected')).catch(err => console.log(err));

app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));
//Create a  session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//Redirection to messages
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Models and Schemas
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/projects', require('./routes/projects') );
//Open at localhost:5000
const PORT = 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
