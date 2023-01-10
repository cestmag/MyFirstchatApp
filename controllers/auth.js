const mysql=require("mysql2");
const jwt= require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});
console.log('bts waaa');
exports.register=(req, res)=>{
    
     console.log(req.body);//body: what comes from the form
     console.log('waaaaa');
     const{name, password}=req.body;// const name=req.body.name    const password=req.body.password
     db.query('SELECT name FROM users WHERE name=?',[name], async (err, results)=>{
         if(err){
             console.log(err);
             
         }
         if(name.length===0||password.length<4){
           return res.render('index',{
                message: 'Input username and password with more than 4 letters'
                 
            });
          
        }else if(results.length>0){//means there is already same one
            //db.query('SELECT password FROM users WHERE name=?', [name], async(err, results)=>{
                // const validornot=await bcrypt.compare(password, results[1])
                 //if(validornot){
                     //login
                // }else {
                   // return res.render('index',{
                       // message: 'The username already exists and the password is not correct'
                         
                   // });
                   return res.render('index',{
                    message: 'The username already exists and the password is not correct'
                      
               });
                 }
          

  let hashedpassword=await bcrypt.hash(password, 8)// for secirity
    console.log(hashedpassword);

   db.query('INSERT INTO users SET ?',{name: name, password: hashedpassword},(err, results)=>{
  if(err){
      console.log(err);
      
  }else{
      console.log('registered');//ここでuserをarrayに格納したい
     return res.render('thread',{// redirect
    message: name + 'でログイン中'
          
     })
    
  }
   })
     });


     


   
}