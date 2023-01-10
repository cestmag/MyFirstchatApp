//gitignore publicにさらされたくないやつを各ファイル必要 .git 
// hbs　アンインストール ejs layouts も？
//!!!!!------passport-------!!
const express=require("express");
const path= require("path");
const mysql=require("mysql2");
//const mysqll=require("mysql2")
const dotenv= require('dotenv');
const cookieParser=require('cookie-parser')
//const expressValidator=require('express-validator')//deleted
const flash=require('express-flash')//deleted
const session=require('express-session')//deleted
const queryString = require('query-string'); //can be deleted


dotenv.config({ path: './.env'});

const app= express();

const http=require("http").createServer(app);//create a sever

var io=require("socket.io")(http);
//loginsystem用のデータベース
const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

//会話保存用のデータベース
const db2=mysql.createConnection({
    host: process.env.DATABASE_HOST,
   user:  process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE2
});



const publicDirectry= path.join(__dirname, './public');//.　は 一こ上のレベル
console.log(__dirname+" heywhatsup");
app.use(express.static(publicDirectry));//静的ファイルの提供
//parse URL-encoded bodies as sent by html forms
app.use(express.urlencoded({extended: true}));
//Parse Json bodies as sent by api clients 登録内容がコマンドプロントに表示される
app.use(express.json());

var newActiveUserName=[]
//var whether=false

app.use(cookieParser())// this is what the guy in the video on youtube mentioned maybe
app.use(session({
    secret: 'dzsetfdrt4387',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:60000}

}))
app.use(flash())//delete
//app.use(expressValidator())//delete



app.set('views',path.join(__dirname, 'views')) //views 
app.set('view engine', 'ejs');

const rooms={}
const users={}
const activeUsersList=[]//id と名前をセットで入れる 連想配列
module.exports=users//delete
db.connect((err)=>{
    if(err)
    console.log(err)
    console.log("Mysql connected.....")
})
db2.connect((err)=>{
    if(err)
    console.log(err)
    console.log("Mysql2 connected......!")
})

//app.use('/',require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.use(function( request, result, next){
    result.setHeader("Access-Control-Allow-Origin","*")
    next()
})

//create API for get_message
app.get("/get_messages", function(request, result){
    db2.query("SELECT * FROM messe2", async(error, messe2)=>{//or aysnc
        //return data will be in JSON format
          result.end(JSON.stringify(messe2))
    })
})
app.get("/search", function(req, res){
    if(req.query.name!==undefined){
    res.render('auth/search', {name:req.query.name})
    }else{
        res.render('nonsearch') 
    }
    
})
app.get("/searchengine", function(req, result){
    const search=req.query.query//これが調べるやつ
    
    db2.query('SELECT * FROM messe2 WHERE messageContent2 LIKE ? OR name LIKE ? OR date LIKE ?',['%'+search+'%','%'+search+'%','%'+search+'%'],async(err, messe22)=>{ //ここがasyncでもfunctionでもおなじやｘｔった
        if(err){//where以降を消してもなぜか[object object]がいっぱい出てくるだけ。タブん数は上のと同じ
            //違いはpostかget否か！！！！！！！！！！のみ!!!!!!!!!!!
            console.log('Err in searching')
        }
        //console.log(messe22)
        //console.log(JSON.stringify(messe22))
    result.end(JSON.stringify(messe22))//ここまでは良い 恐らくサーバーサイドに問題はない   
     //result.end(messe22)
    })

})
/*app.get("/search",function(req,result){
    const search=req.query.query
    //const searchh = queryString.parse(req.query.search);
    //const search="curry"
    console.log(search+" christmas is fuckin coming")
    db2.query('SELECT * FROM messe2 WHERE messageContent2=?',[search],async(err, messe22)=>{ //ここがasyncでもfunctionでもおなじやｘｔった
        if(err){//where以降を消してもなぜか[object object]がいっぱい出てくるだけ。タブん数は上のと同じ
            //違いはpostかget否か！！！！！！！！！！のみ!!!!!!!!!!!
            console.log('Err in searching')
        }
        console.log(messe22)
        console.log(JSON.stringify(messe22))
    result.end(JSON.stringify(messe22))//ここまでは良い 恐らくサーバーサイドに問題はない   
     //result.end(messe22)
    })

    //res.render('auth/search')
})  */

//can be deleted
app.get('/',(req,res)=>{// localhost:5000/の意味
    console.log("accessed by a user")
    res.render('auth/login');
});
app.get('/nonthread',(req,res)=>{// localhost:5000/の意味        
    console.log("dont know what ")
    res.render('nonthread')
});
app.get('/index', (req, res)=>{
    res.render('auth/index')
})
app.get('/mypage',(req, res)=>{
    console.log(req.session.name+"coldplay")
    res.render('auth/mypage',{name:req.query.name})
}) 

/*app.get('/backtothread',(req, res)=>{
    console.log(req.query.name+"Myuniverse")
    res.render('auth/thread',{name:req.query.name})
})  */
app.get('/thread',(req,res)=>{// localhost:5000/の意味
 // if(req.session.logedin){
   // console.log("get thread yeah boy "+req.session.logedin)
    //console.log('uyuyfuyfuyfyfuyfuyu'+req.socket.id)
    //console.log('req.socket:',id)
    //here put a name in the array
   // console.log(req.session.id+" this is an id of the session")
  // newActiveUserName.push(req.session.name)//ここでio.to(SOCKET.ID) でUSERにおくれないか？
  //  console.log(newActiveUserName+"this is the name of user")
     if(req.query.name!==undefined){//!!!!!!!!!!!!!!!!!!!!!!!!!mypageからthreadに戻るときたまにstatus not loginになる
         console.log('status: login '+req.query.name)
    res.render('auth/thread', {name: req.query.name})
     }else{
         console.log('status: not login')
        
                res.render('nonthread')
            

         
     }
  //  }else{
        
  // }  
}); 

app.get('/introduce', (req, res)=>{
    res.render('auth/about', {name:req.query.name})
})


//can be deleted
//reqでsocketとかでsocket.idを取得出来たら、idとusernameを結び付けて、userに名前を渡せるけどできない









http.listen(5000, ()=>{
    console.log("Server started on port 5000");
})
//const rooms={}

module.exports=app//can be deleted
//まったく同時に来たらおわる？

io.on('connection', socket=>{
    var itsgood=false;
    console.log('connected by a user')
    //socket.idをuserにわたす
    socket.emit('giveID',socket.id)
    //activeUsers.push(socket.id)
   socket.on('new-user', name=>{
      
      console.log(socket.id+" "+name+"Welcom!")
       users[socket.id]=name;//put in an array
      console.log(users+" howyoulikethat")
      //socket.emit('shine',"aaaaabccc")
   }) 

   
  /* app.get('/thread',(req,res)=>{// localhost:5000/の意味
    if(req.session.logedin){
    console.log("get thread yeah boyyyyyyyyy "+req.session.logedin)
    //here put a name in the array
    //newActiveUserName=req.session.name
    users[socket.id]=req.session.name
    console.log("done"+users[socket.id])
    socket.emit('new-user', users[socket.id])
    
    console.log(req.session.name+"this is the name of user")
    res.render('auth/thread', {name: req.session.name+'でログイン中'})
    }else{
        
    }
}) */
//socket.emit('new-user','fuckyou')
 /* if(newActiveUserName!==null){
      console.log('symph')
      //socketで名前があるか確認
      if(newActiveUserName.length===1){//1つだけ名前入ってる時 最終的にはloopで
      socket.emit('nameFilledOrNot')
      socket.on('resultOf', data=>{
          console.log('2002')
          if(data==""){//名無しだったら登録する 
            console.log('peaches')
            users[socket.id]=newActiveUserName[0]
            activeUsersList.push({namee:newActiveUserName[0],idd:socket.id})
            //activeuserに入れる
            console.log(activeUsersList[0].namee+" "+activeUsersList[0])
            socket.emit('new-user', newActiveUserName[0])
            newActiveUserName=[]//初期化
          }else if(data===newActiveUserName[0]){//もし同じ名前だったらsocket.idを同じにする
               
          }
      })
    }else{
        //複数の名前があるとき
        newActiveUserName=[]
    } 
   
   
   }   */
socket.on('deletethread',countingStars=>{
    console.log('i told you long ago on the ago insustry',countingStars,socket.id)
    db2.query("DELETE FROM messe2 WHERE id =?",[countingStars],async(err)=>{
        if(err){
            console.log("err in deleting a thread: id "+countingStars)
        }
       io.emit("delete_message", countingStars); 
    })
})   
socket.on('send-socketid',data=>{
    console.log(data+"noooooowayyyyy")
})


    socket.on('send-chat-message', message=>{

        


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!データ挿入の時　'　を含むとエラー出る!!!!!!!!!!!!!!!!!!!!!!! ('"+message+"','"+users[socket.id]+"','"+whatstime()+"')"
        console.log('sent')
        
        db2.query("INSERT INTO messe2 (messageContent2, name, date,good,goodname) VALUES ('"+message+"','"+users[socket.id]+"','"+whatstime()+"','"+0+"','"+""+"')",[message,users[socket.id],whatstime(),0,""], function(error, result){
            if(error){
                console.log('Error: couldt put into the database:'+message+", "+users[socket.id])
            }
            console.log("we are the champ"+message+": "+result.insertId)
            //idを得る
            
          
    //socket.broadcast.emit('chat-message',{ message: message, name:users[socket.id],date:whatstime(),id:result.insertId })// users[socket.id]
    io.emit('chat-message',{ message: message, name:users[socket.id],date:whatstime(),id:result.insertId, good:0 })// users[socket.id]
    })
    })
   

　socket.on("good",data=>{
    //送られてきたdataからいいねが押されたスレッドを特定し 
    //databaseに書き込む -1する そして言い値の名前一覧から　名前user[soket.id]消す
    //data.gla is id
    var whoo=users[socket.id]
    var whic=parseInt(data.which)
    console.log(whic+" this is the whic"+"id: "+data.gla+"  "+typeof(data.gla))
    var ohno=parseInt(data.gla)
    db2.query("SELECT * FROM messe2 WHERE id=?",[ohno],async(err, results)=>{
        if(err){
            console.log("err in selecting good id thread")
        }
         //名前削除
         console.log(results+"uguigiuggi")
         var howmanygood=await results[0].good
         var thenamelist=await results[0].goodname // /mike/tom/jam/...
         if(whic===0){
            thenamelist=thenamelist.replace("/"+whoo+"/","") 
         howmanygood-=1
         }else{
             howmanygood+=1
             thenamelist+="/"+whoo+"/"
             console.log(thenamelist+"this is the name list")
         }
        db2.query("UPDATE messe2 SET good=? , goodname=?  WHERE id=?",[howmanygood,thenamelist,data.gla], async(err)=>{
            if(err){
                console.log('err in updating messe2')
            }
          //挿入
          console.log("thhhhhhhhhhh "+whic+" kk "+data.gla+" whoo "+whoo)
　　　　　　　io.emit('goodnumberchanged',{one:whic, two:data.gla, three:whoo})//!!!!!!!!!!serachのいいね押す時socket id 変わる!!!!!!!!!!!!
          //上のやつも動いてるがなぜか押した本人には変化がない
//押された側に通知する
        })
        //emitで全ユーザーに知らせる必要あり
    })
    
})
 /* socket.on("goodplus", data=>{
//送られてきたdataからいいねが押されたスレッドを特定し
    //databaseに書き込む +1する そして言い値の名前一覧から　名前加える
    db2.query("SELECT　* FROM messe2 WHERE id=?",[data],async(err, resultbad)=>{
        //名前削除
        var howmanygood=resultbad[0].good
        howmanygood=+1
       db2.query("UPDATE messe2 SET good=?  WHERE id = ?",[howmanygood,data], async(err)=>{
           if(err){
               console.log('err in updating messe2')
           }
         //挿入
       })
   })
  }) */
 /* socket.on('disconnect',()=>{

  }) */
    
})
//サーバーの時間とユーザーの時間は違うから時差を計算するする必要あり(user側で)
// return the time now
function whatstime(){
    var now = new Date();
  
    
    var Year = now.getFullYear();
    var Month = now.getMonth()+1;
    var Datee = now.getDate();
    var Hour = now.getHours();
    var Min = now.getMinutes();
    //6を06に
    
    if(Min<10){
    Min="0"+Min;
    }
    var date=Year + "年" + Month + "月" + Datee + "日" + Hour + ":" + Min;
    return date
  }

