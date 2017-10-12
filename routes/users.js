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
  res.render('login');
});

router.post('/handler', function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));

    var username = input.username;
    var password = input.password;

    req.getConnection(function(err,connection){
        if(err)
            console.log("Error connecting : %s ",err );
        connection.query('SELECT * FROM user WHERE username = ? AND password = ?',[username,password],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );
            if(rows.length == 0 ){
                console.log('Invalid Username or Password.');
                res.redirect('/bad_login');
            }

            if(rows.length == 1){
                req.session.isUserLogged = true;
                req.session.userData = {
                    nombre: rows[0].username,
                    contrasena: rows[0].password,
                    tipo: rows[0].tipo
                };
                if(rows[0].tipo == 1){
                    res.redirect('/admin/admin_view');
                }
                else{
                    res.redirect('/faena/faena_view');
                }
            }
        });

        //console.log(query.sql);
    });


});
// file ajax
router.post('/subir_pic', function (req,res) {
    var formidable = require('formidable');
    var fs = require('fs');
    var f_gen = new Date().toLocaleString();
    f_gen = f_gen.replace(/\s/g,'');
    f_gen = f_gen.replace(/\:/g,'');
    f_gen = f_gen.replace(/\//g,'');
    f_gen = f_gen.replace(/\,/g,'');
    f_gen = f_gen + req.session.user.iduser.toString() + ".jpg";
    console.log("fecha: " + f_gen);
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(err) console.log("error file: %s",err);
        var oldpath = files.filetoupload.path;
        var newpath = '/home/proyecta/observa-portal/public/web-img/' + f_gen;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            console.log('File uploaded and moved!');
            res.send("/web-img/" + f_gen);
        });

    });
});




module.exports = router;
