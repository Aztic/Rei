let express = require('express');
let router = express.Router();
let multer = require('multer');
let path = require('path');
let fs = require('fs');
let crypto = require("crypto");
const BASE_URL = "http://localhost:3000/"
const VALID_EXTENSIONS = ["cpp","c","java","js","coffee","cr","css","go","lua","md","conf","php","py","swift","yml"];

function isBrowser(req){
  return req.headers["user-agent"].indexOf("Chrome") !== -1 || req.headers["user-agent"].indexOf("Firefox") !== -1
}
function randomInteger(max,min){
  return Math.floor(Math.random() * (max-min+1)) + min;
}


let codeStorage = multer.diskStorage({
  destination: function (req,file,cb){
    cb(null,'upload/');
  },
  filename: function (req,file,cb) {
    //File "extension"
    let extension = path.extname(file.originalname);
    if(!VALID_EXTENSIONS.includes(extension.slice(1))){
      return cb(new Error("invalid extension"));
    }
    //Random filename
    let name;
    //While the name exists, generate a new one
    do{
        name = crypto.randomBytes(randomInteger(10,5)).toString("hex") + extension;
    }while(fs.existsSync(`./upload/${name}`));
    cb(null,name);
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rei', readonly: false,code:undefined});
});

router.post('/',function(req,res,next){
  let code,ext;
  if(!isBrowser(req)){
    /** Multer things **/
    let up = multer({storage:codeStorage}).single('code');
    up(req,res,err=>{
      if(err){
        console.log(err);
        return res.send(`${err} happened`);
      }
      return res.send(`${BASE_URL}${req.file.filename}\n`);
    });
  }
  else{
    console.log(req.body);
    console.log(req.headers)
    code = req.body.code;
    ext = req.body.ext.split("//")[0];

    if(VALID_EXTENSIONS.indexOf(ext) === -1)
    return res.send("invalid extension\n");

    let filename;
    do{
      filename = crypto.randomBytes(randomInteger(10,5)).toString("hex") +"."+ ext;
    }while(fs.existsSync(`./upload/${filename}`));

    fs.writeFile(`./upload/${filename}`,code,(err)=>{
      if(err)
        throw err;
    });
    return res.redirect("/"+filename);    
  }
});

router.get('/:file.:extension',(req,res,next)=>{
  fs.readFile(`./upload/${req.params.file}.${req.params.extension}`,"utf8",(err,content)=>{
    if(err){
      if(!isBrowser(req)){
        return next(err);
      }
      return res.redirect('/');
    }

    /** If it's not a browser, send plain text **/
    if(!isBrowser(req)){
      return res.send(content);
    }
    res.render("index",{title:"Rei",readonly:true,code:content});
  });
});

router.get('/cdn/:file.:extension',(req,res,next)=>{
  fs.readFile(`./upload/${req.params.file}.${req.params.extension}`,"utf8",(err,content)=>{
    if(err){
      return next(err);
    }
    return res.send(content);
  });
});

module.exports = router;
