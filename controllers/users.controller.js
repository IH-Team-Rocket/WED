const User = require("../models/User.model");
const mongoose = require("mongoose");
const createError = require("http-errors")

module.exports.edit = (req, res, next) => {
  const { id } = req.params

  User.findById(id)
    .then( user=> {
      if (user.email) {
        res.render(`/edit/${id}`)
      } else {
        res.render(`/newedit/${id}`)
      }
    })
    .catch(err => {
      console.log(err);
    })
  
}

module.exports.doEdit = (req, res, next) => {
  const { id } = req.params
  const data = req.body
  User.findById(id)
    .then(user => {
      if(user) {
        return User.findByIdAndUpdate(id, req.body, { new: true })
          .then((user) => {
             res.redirect(200, "/user/:id")
          })
          .catch(err => {
            err.log(err);
          })
      }
    })
}

module.exports.detail = (req, res, next) => {
    const { id } = req.params
    
    User.findById(id)
      .populate(weddings)
      .then((user) => {
        res.render("user/profile", {user})
      })
      .catch((err) => {
        next(createError(404, "User not found"))
      })
}

module.exports.register = (req, res, next) => {
  const {token} = req.params

  User.findOne({token})
    .then(user => {
      if(user) {
        res.render("guest/edit", {user})
      } else {
        res.redirect('/login');
      }
    })
    .catch(err => {
      next(createError(404, "User not found"))
    })

}

module.exports.doRegister = (req, res, next) => {
  const {id} = req.params
  const data = req.body
  data.type = "user"
  
  const renderWithErrors = (errors, user) => {
    console.log(errors);
    res.render("guest/edit", { errors, user })
  }

  if(data.password) {
    User.findById(id)
      .then(user => {
        if(user.token) {
          user.checkPassword(data.password)
            .then(result => {
              if(!result) {
                const { password, name, email } = data;
                user.password = password;
                user.name = name;
                user.email = email;
                user.token = null;
      
                console.log('USER', user)
      
                user.save()
                  .then(user => {
                    console.log('justo antes de redirect a login', user);
                    res.redirect("/login")
                  })
                  .catch(err => {
                    next(createError(404, "User not found"))
                  })
              } else {
                renderWithErrors("password cannot match")
              }
            })
        }
      })
  }

  
}