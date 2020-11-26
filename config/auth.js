module.exports = {
  ensureAuthenticated: function (req, res, next) {
    // req.isAuthenticated attached to passport

    if (req.isAuthenticated()) {
      return next();
    }
    // if (req.user.isUser === "NO") {
    //   req.flash("error_msg", "Your account has been suspended!");
    //   res.redirect("/login");
    // }
    req.flash("error_msg", "Please log in to continue...");
    res.redirect("/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },
};
