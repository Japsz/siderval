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



router.get('/', function(req, res, next){
    res.render('dt/indx', {page_title: "Direccion Tecnica", username: req.session.userData.nombre});
});


router.get('/render_registro',function(req, res, next){
	req.getConnection(function(err, connection){
		connection.query("SELECT idmaterial,detalle FROM material WHERE estado = 'pdf'", function(err, rows){
			if(err)
				console.log("Error Selecting : %s", err);
			var data = rows;
			connection.query("SELECT * FROM EtapaFaena", function(err, rows){
				if(err)
					console.log("Error Selecting : %s", err);
				res.render('dt/render_registro', {data: data, etapas: rows});
			
			});
		});
	});
});




router.get('/updateMaterial/:idmaterial', function(req,res,next){
	var input = req.params;
	req.getConnection(function(err, connection){
		//UPDATE `siderval`.`material` SET `estado`='fin' WHERE `idmaterial`='2';
		connection.query("UPDATE material SET estado = 'bom' WHERE idmaterial='"+input.idmaterial+"'", function(err, rows){
			if(err){
				console.log("Error Selecting : %s", err);
				res.send('error');
			}
			else{
				res.redirect("/dt/render_material");
			}
		});
	});
});


router.get('/render_material', function(req, res, next){
	req.getConnection(function(err, connection){
		connection.query("SELECT idmaterial,detalle FROM material WHERE estado = 'pdf'", function(err, rows){
			if(err){
				console.log("Error Selecting : %s", err);
			}
			else{
				res.render("dt/render_material", {data: rows});
			}
		});
	});

});


/*router.get('/rejectMaterial/:idmaterial', function(req,res,next){
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
});*/


/*router.post('/find_proccess', function(req, res, next){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM EtapaFaena WHERE nombre_etapa LIKE "'+'%' + input.proccess + '%"', function(err, rows){
			if(err){
				console.log("Error Selecting : %s", err);
			}
			console.log(rows);
			res.render('dt/grid_proccess', {data: rows});
		});
	});
});
*/

module.exports = router;