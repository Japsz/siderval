var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , username: req.session.userData.nombre});
});


router.get('/bad_login', function(req, res, next){
	res.render('bad_login', {page_title: 'Ups! Murio'});
});


// file ajax
router.post('/subir_pic', function (req,res) {
	console.log("gG");
    var formidable = require('formidable');
    var fs = require('fs');
    var f_gen = new Date().toLocaleString();
    f_gen = f_gen.replace(/\s/g,'');
    f_gen = f_gen.replace(/\:/g,'');
    f_gen = f_gen.replace(/\//g,'');
    f_gen = f_gen.replace(/\,/g,'');
    f_gen = f_gen + req.session.userData.nombre + ".pdf";
    console.log("fecha: " + f_gen);
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files){
        if(err) console.log("error file: %s",err);
        var oldpath = files.filetoupload.path;
        var newpath = '/home/daniel/Escritorio/siderval/public/archivos/' + f_gen;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            console.log('File uploaded and moved!');
            res.send("/web-img/" + f_gen);
        });
    });
});
module.exports = router;
