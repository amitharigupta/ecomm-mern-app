var express = require('express');
var router = express.Router();
const UserController = require("../controllers/UserController");
const authMiddleWare = require("../middleware/auth");

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.patch('/updateprofile', authMiddleWare.authenticate, UserController.updateUserProfile);

router.get('/validuser', authMiddleWare.authenticate, UserController.validUser);

router.post('/logout', authMiddleWare.authenticate, UserController.logout)

router.post('/sendpasswordlink', UserController.sendPasswordLink);

router.get('/forgotpassword/:id', UserController.forgotPassword);

router.post('/:id', UserController.updatePassword)

module.exports = router;
