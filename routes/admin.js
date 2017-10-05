var express = require('express');
var router = express.Router();
var connection  = require('express-myconnection');
var mysql = require('mysql');


router.use(connection(mysql, {
			  host: '127.0.0.1',
			  user: 'root',
			  password: 'gallardo27',
			  port: 3306,
			  database: 'siderval'
	}, 'pool'));
/* GET users listing. */
router.get('/admin_view', function(req, res, next) {
	req.getConnection(function(err, connection){
		connection.query("SELECT * FROM user", function(err, rows){
			if(err)
				console.log("Error Selecting : %s", err);
			
			res.render('admin/admin_view', {page_title: "Administrador", data: rows});
		})
	});
});

module.exports = router;
