var express = require('express');
var repository = require('../repository');
var router = express.Router();

/* GET api/comments. */
router.get('/comments', function(req, res, next) {
    repository.getAllComments(function(data){
        res.json(data);
    });
});
router.post('/comments', function(req, res, next) {
    repository.insertComment(req.body);
    res.json(req.body);
});
module.exports = router;
