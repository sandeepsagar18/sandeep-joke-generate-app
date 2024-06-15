const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
    return res.render("urlshortner");
});
// router.get("/", async (req, res) => {
//     if(!req.user) return res.redirect("/user/login");
//     const allUrls = await URL.find({createdBy:req.user._id});
//     return res.render("urlshortner",{
//       urls : allUrls,
  
//     });
// });

module.exports = router;