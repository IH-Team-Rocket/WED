const router = require("express").Router();
const passport = require('passport');
const miscController = require("../controllers/misc.controller");
const authController = require("../controllers/auth.controller");
const authMiddlewares = require("../middlewares/authMiddleware");
const usersController = require("../controllers/users.controller");
const weddingController = require("../controllers/wedding.controller")
/*const productsController = require("../controllers/products.controller");
const charactersController = require("../controllers/characters.controller");
const fileUploader = require('../config/cloudinary.config'); */

const SCOPES = [
  "profile",
  "email"
]

// MISC
router.get("/", miscController.home);

//AUTH
router.get("/register", authController.register);
router.post("/register", authController.doRegisterOrganiser);
router.get("/login", authMiddlewares.isNotAuthenticated, authController.login);
router.post("/login", authController.doLogin);
router.get('/login/google', authMiddlewares.isNotAuthenticated, passport.authenticate('google-auth', { scope: SCOPES  }))
router.get('/auth/google/callback', authMiddlewares.isNotAuthenticated, authController.doLoginGoogle);
//router.get("/logout", authMiddlewares.isAuthenticated, authController.logout);

//USER
router.get("/edit/:id", usersController.edit);
router.post("edit/:id", usersController.doEdit);
router.get("/profile", authMiddlewares.isAuthenticated, usersController.detail)

//WEDDING
router.get("/wedding/create", authMiddlewares.isAuthenticated, weddingController.create)
router.post("/wedding/create", weddingController.doCreate)
router.get("/wedding/:id", authController.isAuthenticated, weddingController.detail)

module.exports = router