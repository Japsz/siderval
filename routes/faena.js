var express = require('express');
var router = express.Router();
var connection  = require('express-myconnection');
var mysql = require('mysql');


router.use(

	connection(mysql, {
		  host: '127.0.0.1',
		  user: 'admin',
		  password: '1234',
		  port: 3306,
		  database: 'siderval'
	}, 'pool')
);

/* GET users listing. */
router.get('/faena_view', function(req, res, next) {
	res.render('faena/faena_view', {page_title: "Administrador", username: req.session.userData.nombre});
});



module.exports = router;
