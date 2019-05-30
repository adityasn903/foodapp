const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const axios = require('axios')
const jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
var session = require('express-session');
const _ = require("lodash");
const { users } = require("./models/users");
// const { dishes } = require("./models/dishes");
const { mongoose } = require("./db/mongoose");
const expressValidator = require('express-validator');
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

const router = express.Router();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start();

// All request-response handling

app.post("/login", (req, res) => {
  var body = _.pick(req.body, ["username", "password"]);
  users.findByCredentials(body.username, body.password)
    .then(user => {
      user.generateAuthToken().then(token => {
        req.session.authUser = { userId: token };
        return res.json({
              userId: token,
              fullName: user.fullName,
              phone: user.contact[0]
              });
      })
    })
    .catch(e => {
      res.status(401).send();
    });
});

// Add POST - /api/logout
app.post("/logout", (req, res) => {

  users.findOne({'tokens.token':req.body.token}).then((user)=>{
    user.loginFlag = false;
    user.save();
  }).catch((e)=>{
      res.status(401).send();
  });

  delete req.session.authUser;
 
  res.json({ ok: true });
});

app.post("/signup", (req, res) => {
  var body = _.pick(req.body, [
    "fullName",
    "password",
    "contact",
    "gender",
    "zipCode",
    "userEmail",
    "OTPtoken"
  ]);
  body.createdAt = new Date();
  if(body.OTPtoken == req.session.OtpToken){
    var newUser = new users(body);
    newUser
        .save()
        .then(() => {
          return newUser.generateAuthToken();
        })
        .then(token => {
          req.session.authUser = { userId: token };
          return res.json({
            userId: token,
            fullName: newUser.fullName,
            phoneNumber: newUser.phoneNumber
          });
        })
        .catch(e => {
          res.status(400).send(e);
        });
  }else{
    res.send("You are not allowed to register")
  }
});

app.post("/sendotp", (req, res) => {

  users.findOne({contact: req.body.phoneNumber}).then((currentUser)=>{
    if(!currentUser){
      var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
      req.session.OTPtoken = token;
      var nexmoSend = {
        api_key: "12a22759",
        api_secret: "OpPYZQiQGt9j1G8Y",
        number: req.body.phoneNumber,
        brand: "NexmoVerifyTest"
      };
      axios
          .post("https://api.nexmo.com/verify/json ", nexmoSend)
          .then(response => {
            res.send(response.data);
          })
          .catch(err => {
            res.status(401).send("Error sending OTP");
          });
    } else {
      res.status(401).send('User Already is there')
    }
  })
});

app.post("/verifyotp", (req, res) => {

  var nexmoSend = {
    api_key: "12a22759",
    api_secret: "OpPYZQiQGt9j1G8Y",
    request_id: req.body.request_id,
    code: req.body.code
  };
  axios
    .post("https://api.nexmo.com/verify/check/json", nexmoSend)
    .then(response => {
      res.send({resp:response.data, token:req.session.OTPtoken});
    })
    .catch(err => {
      res.status(401).send("Error sending OTP");
    });
});
// req-res to get the dish list and dish details




