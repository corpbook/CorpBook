const User = require("../models/userSchema");

const TaskController = {
  createAccount(req, res, next) {
    const firstName = res.locals.doc.firstName;
    const lastName = res.locals.doc.lastName;
    const country = res.locals.doc.country;
    const id = res.locals.doc.id;
    const language = res.locals.doc.language;
    const imageURL = res.locals.doc.imageURL;

    const newUser = {
      firstName,
      lastName,
      country,
      id,
      language,
      imageURL
    }


    User.create(newUser, (err, doc) => {
      if (err) {
        next(err);
      } else {
        console.log('it works')
        res.locals.doc = doc
        next();
      }
    })
  },

  getUser(req, res, next) {
    const { name } = req.params;

    User.find({ firstName: name }, (err, doc) => {
      if (err || !doc[0]) {
        next('Cannot get user');
      } else {
        res.locals.doc = doc;
        next();
      }
    })
    //res.send(res.locals.doc);
   },

   getAllUsers(req, res, next) {
  
    User.find({}, (err, doc) => {
      if (err || !doc[0]) {
        next('Cannot get user');
      } else {
        res.locals.doc = doc;
        next();
      }
    })
    //res.send(res.locals.doc);
   },
  
  changeUser(req, res, next) {
    const { name } = req.params;

    User.update({ username: name }, req.body,(err, doc) => {
      if (err || !doc.n) {
        next('Cannot update user');
      } else {
        next();
      }
    })
  },

  deleteUser(req, res, next) {
    const { name } = req.params;

    User.deleteOne({ username: name }, (err, doc) => {
      if (err || !doc.deletedCount) {
        next('Could not delete account'); 
      } else {
        next();
      }
    })
  },
};

module.exports = TaskController;