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
router.get('/admin_view', function(req, res, next) {
	if(req.session.userData){
		res.render('admin/admin_view', {page_title: "Administrador", username: req.session.userData.nombre});
	}
	else{
		res.redirect('/bad_login');
	}
});

router.get('/render_admin', function(req, res, next) {
	req.getConnection(function(err, connection){
		connection.query("SELECT * FROM user", function(err, rows){
			if(err)
				console.log("Error Selecting : %s", err);
			
			res.render('admin/cuentas_fragment', {data: rows});
		})
	});
});



router.get('/render_informes', function(req, res, next){
	res.render('admin/informes_fragment');
});


router.get('/render_ficha_lanzamiento', function(req, res, next){
	res.render('admin/ficha_lanzamiento_fragment');
});


router.post('/ficha_lanzamiento', function(req, res, next){
	var tipo = JSON.parse(JSON.stringify(req.body)).tipo_producto;
	if(tipo=="P" || tipo=="S"){
		res.render('admin/ficha_lanzamiento_producto');
	}
	else{
		res.render('admin/ficha_lanzamiento_otros');
	}
});

router.get('/render_tabla', function(req, res, next){
	res.render('admin/tabla_ficha');
});


module.exports = router;
