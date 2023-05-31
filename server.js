const path = require('path');
const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const sessionStorage = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = 3001;

const userSession = {
  secret: 'werkithegel',
  cookie: {
    maxAge: 18000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new sessionStorage({
    db: sequelize
  })
};

const view = hbs.create({ helpers });

app.use(session(userSession));

app.engine('handlebars', view.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
