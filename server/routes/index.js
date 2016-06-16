var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Guest Book' });
});

router.get('/guest-book-socket', function(req, res, next) {
  res.render('guest-book-socket', { title: 'Guest Book with Socket.io' });
});

router.get('/guest-book-ajax', function(req, res, next) {
  res.render('guest-book-ajax', { title: 'Guest Book with Ajax' });
});
module.exports = router;
