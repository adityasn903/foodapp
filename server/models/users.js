const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
let date = require('date-and-time');

var UserSchema = mongoose.Schema({
    fullName: {type: String},
    password: {type:String},
    googleId: String,
    contact:[
    {type: String, require:true, unique:true}
    ],
    gender:{type: String},
    zipCode:{type:Number},
    userEmail: {type: String, require: true},
    tokens: [{
        access:{ type:String, required:true},
        token:{ type:String, required:true}
    }],
    createdAt:{type: Date},
    loggedInAt:{type: Date},
    loginFlag:{type:Boolean},
    transactionhistory: [{
    vehicleId: {type: mongoose.Schema.Types.ObjectId, ref: 'vehicles' },
    plan: {type: Number},
    bookeddate: {type: String},
    bill:{type: Number}
    }],
    alivebooking: [{
    vehicleId: {type: mongoose.Schema.Types.ObjectId, ref: 'vehicles' },
    plan: {type: Number},
    bookeddate: {type: String}
    }]
});

UserSchema.methods.generateAuthToken = function (){
   var newUser = this;
   var access ='auth';
   var token = jwt.sign({_id: newUser._id.toHexString(), access},'abc123').toString();
   newUser.tokens.push({access, token});
   newUser.loginFlag = true;
   newUser.loggedInAt = new Date();
   return newUser.save().then(() =>{
       return token;
   })
};

UserSchema.statics.findByCredentials = function(phoneNumber, password){
    var users = this;
    return users.find({contact:phoneNumber}).then((user)=>{
       if(!user){
           return Promise.reject();
       }
    return new Promise((resolve, reject) =>{
       bcrypt.compare(password, user[0].password,(err, res)=>{
           if(res){
            resolve(user[0])
           }else{
               reject()
           }
       })
    })
    });
};

UserSchema.pre('save', function(next){
    var newUser = this;
   if(newUser.isModified('password')) {
       bcrypt.genSalt(10, (err, salt) =>{
           bcrypt.hash(newUser.password, salt, (err, hash) =>{
               newUser.password = hash;
               next()
           })
       })

   }else {
       next();
   }
});

var users = mongoose.model('users',UserSchema);
module.exports = { users };

