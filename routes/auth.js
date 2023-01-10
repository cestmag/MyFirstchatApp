const express= require('express');//login register logout用 auth
//const userarray=require('../Apap') to put a username in the user array
//const authController=require('../controllers/auth');

var usernameeach=""

var loginornot=false
const mysql=require("mysql2");
const jwt= require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const db2=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE2
});

const router=express.Router();
console.log('come here');//auth/register
//--router.post('/authentication', authController.register);--// create author route   postは秘密の通信 getは公開
//       auth/index
//ユーザー登録
router.post('/post-register', function(req, res, next){
    console.log(req.body);//body: what comes from the form
    console.log('waaaaa');
    console.log(req.socket+"this is the socket")
    
    req.socket.emit('send-socketid','aaaaa')
    const{name, password}=req.body;// const name=req.body.name    const password=req.body.password
    db.query('SELECT name FROM users WHERE name=?',[name], async (err, results)=>{
        if(err){
            console.log(err);
            
        }
        if(name.length===0||password.length<4){//password should be more than 4 letter long
            
          req.flash('error','名前またはパスワードが有効ではありません。パスワードは4文字以上だにょん')
        
                 
             
                res.redirect('/index') 
       }else if(results.length>0){//means there is already same one
           //db.query('SELECT password FROM users WHERE name=?', [name], async(err, results)=>{
               // const validornot=await bcrypt.compare(password, results[0]) get the data from the results array
                //if(validornot){
                    //res.redirect('/thread') login success
               // }else {
                  // return res.render('index',{
                      // message: 'The username already exists and the password is not correct'
                        
                  // });
                 //REQ.FLASH('ERROR','パスワードが違うよ～ん') 
                 req.flash('error', 'そのユーザーネームは既に登録されとる。別の書いてちょ')
                 res.redirect('/index')                  //return res.redirect('/index?e='+encodeURIComponent('Incorrect password'))//,{
                   //message: 'The username already exists and the password is not correct'
                     
             // });
                }else{
         

 let hashedpassword=await bcrypt.hash(password, 8)// for secirity
   console.log(hashedpassword);

  db.query('INSERT INTO users SET ?',{name: name, password: hashedpassword},(err, results)=>{
 if(err){
     console.log(err);
     
 }else{
   console.log('registered');//ここでuserをarrayに格納したい
 //  return res.render('thread',{
 //  message: name + 'でログイン中'
         
  //  })
   req.session.logedin=true
   req.session.name=name
   
   res.redirect('/thread?name='+encodeURI(req.session.name)) //理想はここでactive userをarrayに格納
 }
  })
}
    });
})
//ユーザー認証
router.post('/authentication', function(req,res, next){
   // console.log('I want it I got it')
    const{name, password}=req.body;
   //console.log(req.socket+" this is the SOCKET")
    db.query('SELECT password FROM users WHERE name=?',[name], async (err, results)=>{
        if(err){
            console.log(err)
        }
     if(results.length<=0){
         console.log('bad guy')
          req.flash('error','そのユーザー名は存在しねえよ')   
        res.redirect('/') 
       // res.end();//focus
      //  return;
     }else{   //poroblem
        
        console.log('passowrd is '+results[0])
               //var password_hashed=results[0]["password"]
               const validornot=await bcrypt.compare(password, results[0].password) //型が違う？
               console.log(validornot+"see here")
                if(validornot){
                    req.session.logedin=true
                    req.session.name=name
                    usernameeach=name
                    loginornot=true// ここでapapのactiveuser arrayに追加したい
                    
                    res.redirect('/thread?name='+encodeURI(req.session.name)) //login completed!
               }else {
                   console.log("finally we did it")
                   req.flash('error','パスワード違うよ～ん。')
                   res.redirect('/')
                  // return res.render('index',{
                      // message: 'The username already exists and the password is not correct'
               }     
            } 
                
})
 })
//検索機能

/*  router.post('/gosearch',function(req, res, next){
    const search=req.body.search
    console.log(search+" !googling")
    db2.query('SELECT * FROM messe2 where name OR date OR messageContent2 LIKE ?',['%'+search+'%'],async(err, results)=>{
        if(err){
            console.log('Err in searching')
        }
        res.end(JSON.stringify(results))   
    }) 



    req.session.search=search
    res.redirect('/search')
})  */



module.exports=router;
//howyoulikethat
