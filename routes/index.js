var express = require('express');
var router = express.Router();
var path = require('path');

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
    var f_gen = new Date();
    f_gen = f_gen.getHours()+":"+f_gen.getMinutes()+":"+f_gen.getSeconds()+"_"+f_gen.getDate()+"-"+(f_gen.getMonth()+1)+"-"+f_gen.getFullYear()+"_";
    f_gen = f_gen + req.session.userData.nombre + ".pdf";
    console.log("fecha: " + f_gen);
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files){
        if(err) console.log("error file: %s",err);
        var oldpath = files.filetoupload.path;

        //APU TIENES QUE CAMBIAR LAS RUTAS MADAFUCKER
        //pd: deja la mia como comentario xD
        var newpath = '/home/daniel/Escritorio/siderval/public/archivos/' + f_gen;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            console.log('File uploaded and moved!');
            res.redirect("/list_dir");
        });
    });
});

router.get('/list_dir', function(req, res){
	var data = [];
	var fs = require("fs");
                fs.readdir('/home/daniel/Escritorio/siderval/public/archivos', function(err, files) {
                    if (err) {
                        console.log("Error: ", err);
                    }
                    files.map(function(file) {
                        return path.join('/home/daniel/Escritorio/siderval/public/archivos', file);
                    }).filter(function(file) {
                        return fs.statSync(file).isFile();
                    }).forEach(function(file) {
                        var ext = path.extname(file);
                        var name_complete = path.basename(file);
                        var name_simple = name_complete.replace(ext, "");
                        data[data.length] = {nombre: name_simple};
                        console.log("---> %s : %s (%s)", name_complete, name_simple, ext);
                    });
                    console.log(data);
                    res.render('admin/render_files', {data: data});
                });
});



router.get('/pdf_file/:filename', function(req, res, next) {

        res.render('pdf/pdf');    
});


module.exports = router;
