require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const path = require('path')
const dbConnect = require('./helpers/db');
const router = require('./routes');

const app = express();
const port = 3000;

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Connect MongoDB server
dbConnect();

// Set EJS Templating Engine
app.use(expressLayouts);
app.set('layout', 'layouts/main.layout.ejs');
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)
app.set('view engine', 'ejs');
app.set('views', './views');

// Use cookie-parser and session
// app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 60 * 60 * 1000 // 1h exprire cookie
  }
}))


// Use body-parser
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Use method-override
app.use(methodOverride('_method'));

// Define Routes
app.use(router);

// Customize error handler
// app.use((err, req, res, next) => {
//   res.status(500).render('pages/serverError/serverError', {
//     layout: 'layouts/base.layout.ejs'
//   })
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
