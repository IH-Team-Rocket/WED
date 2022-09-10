const router = require("express").Router();
const passport = require('passport');
const miscController = require("../controllers/misc.controller");
const authController = require("../controllers/auth.controller");
const authMiddlewares = require("../middlewares/authMiddleware");
const usersController = require("../controllers/users.controller");
const weddingController = require("../controllers/wedding.controller")
const giftsController = require ("../controllers/gifts.controller");
const ticketController = require ("../controllers/ticket.controller");
//const fileUploader = require('../config/cloudinary.config');

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
router.get("/logout", authMiddlewares.isAuthenticated, authController.logout);

//USER
router.get("/edit/:id", usersController.edit);
router.post("/edit/:id", usersController.doEdit);
router.get("/profile", authMiddlewares.isAuthenticated, usersController.detail)
router.get("/guest/:token", usersController.register);
router.post("/guest/edit/:id", usersController.doRegister);

//WEDDING
router.get("/wedding/create", authMiddlewares.isAuthenticated, weddingController.create)
router.post("/wedding/create", weddingController.doCreate)
router.get("/wedding/:id", authMiddlewares.isAuthenticated, weddingController.detail)

//GIFT
router.get("/wedding/:id/gifts", authMiddlewares.isAuthenticated, giftsController.list)
router.get("/wedding/:id/createGift", authMiddlewares.isAuthenticated, giftsController.create)
router.post("/wedding/:id/createGift", giftsController.doCreate)

//TICKET
router.get("/wedding/:id/ticket", authMiddlewares.isAuthenticated, ticketController.create)
router.post("/wedding/:id/ticket", ticketController.doCreate)

//DASHBOARD
router.get("/wedding/:id/dashboard", authMiddlewares.isAdmin, dashboardController.dashboard)


module.exports = router