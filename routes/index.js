var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/',function(req, res, next){
	res.sendFile(path.dirname(require.main.filename)+'/dist/index.html');
});

router.get('/hello',function(req, res, next){
	res.sendFile(path.dirname(require.main.filename)+'/dist/results.html');
});

module.exports = router;