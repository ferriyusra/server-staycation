var express = require("express");
var router = express.Router();

/* GET home page. */
// sebelum ada view login make ini
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", function (req, res, next) {
  res.redirect("/admin/signin");
});

module.exports = router;
