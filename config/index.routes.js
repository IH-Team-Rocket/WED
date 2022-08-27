const router = require("express").Router();
//const passport = require('passport');
const miscController = require("../controllers/misc.controller");
/* const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const productsController = require("../controllers/products.controller");
const charactersController = require("../controllers/characters.controller");
const authMiddlewares = require("../middlewares/authMiddleware");
const fileUploader = require('../config/cloudinary.config'); */

/* const SCOPES = [
  "profile",
  "email"
] */

// MISC
router.get("/", miscController.home);

module.exports = router