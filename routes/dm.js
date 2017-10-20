var express = require('express');
var router = express.Router();
var connection  = require('express-myconnection');
var mysql = require('mysql');

router.use(

    connection(mysql,{

        host: '127.0.0.1',
        user: 'admin',
        password : '1234',
        port : 3306,
        database:'siderval'

    },'pool')

);


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('dm/indx', {page_title: "Data manager", username: req.session.userData.nombre});
});


router.post('/material_pendiente', function(req, res, next){
	req.getConnection(function(err, connection){
		connection.query("SELECT idmaterial,detalle FROM material WHERE estado = 'dmCho'", function(err, rows){
			if(err){console.log("Error Selecting : %s", err);}
			res.render('dm/material_pendiente', {data: rows});
		});
	});
});


router.get('/updateMaterial/:idmaterial', function(req,res,next){
	var input = req.params;
	req.getConnection(function(err, connection){
		//UPDATE `siderval`.`material` SET `estado`='fin' WHERE `idmaterial`='2';
		connection.query("UPDATE material SET estado = 'fin' WHERE idmaterial='"+input.idmaterial+"'", function(err, rows){
			if(err){
				console.log("Error Selecting : %s", err);
				res.send('error');
			}
			else{
				res.redirect("/dm/render_material");
			}
		});
	});
});


router.get('/rejectMaterial/:idmaterial', function(req,res,next){
	var input = req.params;
	req.getConnection(function(err, connection){
		//UPDATE `siderval`.`material` SET `estado`='fin' WHERE `idmaterial`='2';
		connection.query("UPDATE material SET estado = 'plan' WHERE idmaterial='"+input.idmaterial+"'", function(err, rows){
			if(err){
				console.log("Error Selecting : %s", err);
				res.send('error');
			}
			else{
				res.redirect("/dm/render_material");
			}
		});
	});
});

router.get('/render_material', function(req, res, next){
	req.getConnection(function(err, connection){
		connection.query("SELECT idmaterial,detalle FROM material WHERE estado = 'dmCho'", function(err, rows){
			if(err){
				console.log("Error Selecting : %s", err);
			}
			else{
				res.render("dm/render_material", {data: rows});
			}
		});
	});
});
module.exports = router;
