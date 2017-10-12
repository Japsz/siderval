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


router.get('/log_out', function(req, res){
    console.log(req.session.userData);
    req.session.userData = undefined;
    console.log("Restaurando datos de usuario");
    console.log(req.session.userData);
    res.redirect('/user');
});


module.exports = router;