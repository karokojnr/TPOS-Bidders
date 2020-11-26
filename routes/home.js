const express = require("express");
const app = express();
const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const { forwardAuthenticated, ensureAuthenticated } = require("../config/auth");

app.get("/", ensureAuthenticated, homeController.getHome);
app.get("/tender/:id", ensureAuthenticated, homeController.getTender);
app.get("/login", forwardAuthenticated, authController.getLogin);
app.get("/register", forwardAuthenticated, authController.getRegister);
app.get("/logout", authController.getLogout);
app.get("/bids", homeController.getBids);
app.post("/login", authController.postLogin);
app.post("/register", authController.postRegister);
app.post("/make-bid", ensureAuthenticated, homeController.postMakeBid);


module.exports = app;
