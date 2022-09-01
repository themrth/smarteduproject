const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const app = express();
const pageRoute = require('./router/pageRoute');
const courseRoute = require('./router/courseRoute');
const categoryRoute = require('./router/categoryRoute');
const userRoute = require('./router/userRoute');

//Template Engine
app.set('view engine', 'ejs');

// Global Variable
global.userIN = null;

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//Route
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);
app.use((req,res) => {
  res.status(404).render('404')
})

//MongoDB Connection
mongoose
  .connect('mongodb://localhost/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connected Successfuly');
  })
  .catch((err) => {
    console.log(err);
  });

// Local Connection
const port = 3000;
app.listen(port, () => {
  console.log(`Server is started on ${port}`);
});
