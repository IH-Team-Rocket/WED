const Wedding = require("../models/Wedding.model");

module.exports.isNotAuthenticated = (req, res, next) => {
    if (req.isUnauthenticated()) {
      next();
    } else {
      res.redirect("/profile");
    }
  };
  
  module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/login");
    }
  };

  module.exports.isWeddingAdmin = (req, res, next) => {
    const { id } = req.params
    const user = req.user

    Wedding.findById(id)
      .then(wedding => {
        if(wedding.admin == user.id) {
          next();
      } else {
          res.redirect("/profile")
      }
      })
      .catch(err => {
        console.error(err)
      })
  };

