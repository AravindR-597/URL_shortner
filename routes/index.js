var express = require("express");
var router = express.Router();
var mainfunctions = require("../functions/dbfunctions");
var shortid = require("shortid");

/* GET home page. */
router.get("/", function (req, res, next) {
  mainfunctions.display().then((displayUrl) => {
    res.render("index", { title: "URL Shortner", displayUrl });
  });
});
// Shrink Url and add to Database
router.post("/shrink", (req, res) => {
  let shorturl = {};
  shorturl.orginalUrl = req.body.URL;
  shorturl.shrinkedUrl = shortid.generate(req.body.URL);
  mainfunctions.add(shorturl, () => {
    res.redirect("/");
  });
});

//Redirect to Orginal Url
router.get("/:shrinkedUrl", (req, res) => {
  let url = req.params.shrinkedUrl;
  mainfunctions.findUrl(url).then((response) => {
    if (response.orginalUrl == null) {
      return res.sendStatus(404);
    } else res.redirect(response.orginalUrl);
  });
});
module.exports = router;
