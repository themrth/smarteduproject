const express = require('express');
const app = express();

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));

//Routes
app.use('/', (req, res) => {
  res.render('main.ejs', {
    page_name: "home"
  });
});

app.use('/about', (req, res) => {
  res.render('about.ejs', {
    page_name: "about"
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is started on ${port}`);
});
