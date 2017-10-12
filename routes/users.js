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
                res.redirect('/');
            }
        });

        //console.log(query.sql);
    });


});



module.exports = router;
