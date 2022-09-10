const User = require("../models/User.model");
const mongoose = require("mongoose");
const createError = require("http-errors");
const Wedding = require("../models/Wedding.model")

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
    const { _id } = req.user
    
    User.findById(_id)
      .populate("weddings")
      .then((user) => {
        res.render("user/profile", {user});
      })
      .catch((err) => {
        next(createError(404, "User not found"))
      });
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
    res.render("guest/edit", { errors, user })
  }
  User.findOne({ email: data.email })
    .then((user) => {
      if(user){
        User.findById(id)
        .then((fakeUser) => {
          if(!user.weddings.includes(fakeUser.weddings[0])){
            user.weddings.push(fakeUser.weddings[0])
            user.save()
              .then(() => {
                res.render("auth/login")
              })
              .catch((err) => {
                res.renderWithErrors("auth/login")
              })
          }else {
            res.redirect('/login')
          }
        })
      }else if(data.password) {
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
                
                    user.save()
                      .then(user => {
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
    })
}