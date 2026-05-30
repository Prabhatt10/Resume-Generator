const express = require("express");
const authRouter = express.Router();
const authController = require('../controller/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

authRouter.post("/register", authController.registerController);
authRouter.post("/login", authController.loginController);
authRouter.get("/logout", authController.logoutController);
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController);

module.exports = authRouter;