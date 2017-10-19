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
    res.render('/plan/indx.ejs');
});
