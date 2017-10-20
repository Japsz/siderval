var express = require('express');
var router = express.Router();
var connection  = require('express-myconnection');
var mysql = require('mysql');

router.use(

    connection(mysql,{

        host: '127.0.0.1',
        user: 'user',
        password : '1234',
        port : 3306,
        database:'siderval'

    },'pool')

);


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('plan/indx',{page_title:"Planificación",username: req.session.userData.nombre});
});

router.get('/render_informes', function(req, res, next){
    res.render('plan/informes_fragment');
});
router.get('/construir', function(req, res, next){
    if(req.session.isUserLogged){
        req.getConnection(function(err,connection){
            if(err) console.log("Connection Error: %s",err);
           connection.query("SELECT material.detalle,material.idmaterial,producto.pdf,producto.idproducto FROM producto RIGHT JOIN material ON material.idmaterial = producto.idmaterial" +
               " WHERE material.tipo = ? AND material.estado = ? GROUP BY material.idmaterial",["prod","bom"],function (err,materials){
               if(err) console.log("Select Error: %s",err);
               res.render('plan/construir',{data: materials});
           });
        });
    } else res.redirect("/bad_login");
});

router.get('/render_ficha_lanzamiento', function(req, res, next){
    res.render('plan/ficha_lanzamiento_fragment');
});

router.post('/registro_mat', function(req, res, next){
    if(req.session.isUserLogged){

        var tipo = JSON.parse(JSON.stringify(req.body));
        req.getConnection(function (err, connection){
           if(err) console.log("Connection Error: %s",err);
           connection.query("SELECT * FROM caracteristica",function(err,caracts){
               if(err) console.log("Select Error: %s",err);
               if(tipo.tipo == "prod"){
                   connection.query("SELECT aleacion.idaleacion,aleacion.nom,GROUP_CONCAT(subaleacion.idsubaleacion,'@',subaleacion.subnom) as subs FROM aleacion LEFT JOIN subaleacion" +
                       " ON subaleacion.idaleacion = aleacion.idaleacion GROUP BY aleacion.idaleacion",function (err,aleaciones){
                       if(err) console.log("Select Error: %s",err);
                       res.render('plan/registro_mat',{tipo: tipo.tipo,caracts: caracts, data: aleaciones});
                   });
               } else{
                   res.render('plan/registro_mat',{tipo: tipo.tipo,caracts: caracts,data: []});
               }

           });
        });
    }
});
router.post('/save_mat', function(req, res, next){
    if(req.session.isUserLogged){

        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            u_medida: input.u_medida,
            f_aprov: input.f_aprov,
            leadtime: input.leadtime,
            precio:input.precio,
            abc:input.abc,
            tipo:input.tipo,
            especificacion:input.especificacion,
            caracteristica:input.caracteristica,
            detalle:input.detalle
        };
        if(input.tipo== "prod"){
            data.estado = "pdf";
        } else {
            data.estado = "geCho";
        }

        req.getConnection(function (err, connection){
            if(err) console.log("Connection Error: %s",err);
            connection.query("INSERT INTO material SET ?",data,function(err,material){
                if(err) console.log("Select Error: %s",err);
                if(input.tipo == "prod"){
                    connection.query("INSERT INTO producto SET ?",{idmaterial: material.insertId,aleacion:input.aleacion,subaleacion:input.subaleacion},function (err,aleaciones){
                        if(err) console.log("Select Error: %s",err);
                        res.send("si");
                    });
                } else if(input.tipo=="recur"){
                    connection.query("INSERT INTO recurso SET ?",{idmaterial: material.insertId,u_pedido:input.u_pedido,cod_proveedor:input.cod_proveedor,punto_pedido:input.punto_pedido},function (err,aleaciones){
                        if(err) console.log("Select Error: %s",err);
                        res.send("si");
                    });
                } else {
                    connection.query("INSERT INTO otro SET ?",{idmaterial: material.insertId},function (err,aleaciones){
                        if(err) console.log("Select Error: %s",err);
                        res.send("si");
                    });
                }
            });
        });
    }
});



module.exports = router;