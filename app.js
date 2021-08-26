const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
const router = require('./routes/index');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});