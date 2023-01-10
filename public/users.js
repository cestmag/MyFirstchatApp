



//サーバーの時間とユーザーの時間の誤差求める必要あり
var thisusername=""
//const expresss=require('express')
const socket=io("http://localhost:5000")

const messageform=document.getElementById('send-new-thread')
const messageContainer=document.getElementById('message-here')
const messageInput=document.getElementById('threadbox')

const usernameget=document.getElementById('entrybutton')

const userIDget=document.getElementById('entrybutton')
const usernamenyu=document.getElementById('koko')
const thisusernames=document.getElementById('usernamepunk2')//thread
const entrygate=document.getElementById('entrygate')
const daftpunk=document.getElementById('usernamepunk22')//mypage
const stromae=document.getElementById('usernamepunk222')//search
//usernamepunk222
const deletebutton=document.getElementsByTagName('gonnabeDeleted')

const script=document.getElementById('jqueryy')
//const whetherornot=require('../routes/auth/loginornot')
//const onamae=require('../routes/auth/usernameeach')
//usernameget.onclick=function(){
//    const nameofuser=usernamenyu.value//get from auth.js controller
//    console.log("smooth like a butter"+nameofuser)

//routes から得たい
var namelocked=false
var userid=""
var userID=[]
var timenow=""
//console.log(userID+"this is idddddd")
//add conditional to
/*entrygate.addEventListener('submit',e=>{
     e.preventDefault()
     console.log('aaaaa')
     thisusername=usernamenyu.value
  

}) */
/*if(daftpunk.innerText!==null){
  console.log('yeahm maybe its not ok since i saw you yesterday')
}   */

  
  /*script.addEventListener('load', function() {

    // ここにjQueryの記述をする
    $(function() {
      console.log('test')
    })
  
  }) */


/*if(deletebutton.length!==0){
  //deletebutton.nameの後ろに部分のみを取り出す
 //name is "butt-XXX"
 //for
 console.log('hihihhihihhi')
 var morethanyouknow=deletebutton[0].getAttribute("id")
  
  
  console.log("in the name of love "+morethanyouknow)
  //socket.emit('deletethread',morethanyouknow)
  //deltedbutton削除
  //deletebutton=[] 
  console.log('hi nice to meet you'+deletebutton.length)
} */


//severから名前が送られてくる

/*socket.on('new-user', dataname=>{
  thisusername=dataname
  
  console.log(thisusername)
}) */

if(thisusernames!==null&&namelocked===false){
  thisusername=thisusernames.innerText
  if(thisusername!==null){
  
  socket.emit('new-user', thisusername)
  namelocked=true
  }//名前が万が一変更されんよに
  //daftpunk.innerHTML=thisusername
}else if(daftpunk!==null&&namelocked===false){
  thisusername=daftpunk.innerText
  if(thisusername!==null){
  
  socket.emit('new-user', thisusername)
  namelocked=true
}
}else if(stromae!==null&&namelocked===false){
  thisusername=stromae.innerText
  if(thisusername!==null){
    
    socket.emit('new-user', thisusername)
    namelocked=true
  }
}
//socket.emit('new-user', 'hell')
/*userIDget.addEventListener('submit', e=>{
  const sendID=""
}) */
//nonthreadでも表示される必要あり


//}
//new-user
//set id
socket.on('giveID', data=>{
userID=data
//socket.emit('new-user', thisusername)
console.log('socket.id has changed, this user socket id is '+userID+' and name is'+thisusername)
}) 
//threadが存在する
if(messageform!==null){
socket.on('chat-message', data=>{
  

    if(data.name===thisusername){
    appendMessage('You', data.message , data.date,data.id,data.good,true)
    }else{ 
    appendMessage(data.name, data.message, data.date,data.id,data.good,false)
    }
})

   messageform.addEventListener('submit', e=>{
  e.preventDefault()
  const message=messageInput.value
 // appendMessage('You',message, whatstime(),'-1' ,true)//自分のメッセージ エスケープ$が使えないなぜfuck
  console.log(thisusername+" fasterthan")
  socket.emit('send-chat-message', message)
  
  messageInput.value=''


})

 /*socket.on("delete_message",thenumber=>{
      //thread pageを見ているユーザーの画面変更
      console.log("socket.on deleted message")
      var node=document.getElementById("cont-"+thenumber)
      console.log("socket.on deleted message")
      node.innerHTML="This message actually has been deleted haha"
      node.classList.add("redline")
      var buttondele=document.getElementById("good-"+thenumber)
      buttondele.remove()
 }) */


//daftpunkがsearch存在するとき、この上のやつ
//if(messageform!==null||daftpunk!==null||stromae!==null){
  
//}



}
//usernameがからかどうか返す
socket.on('nameFilledOrNot', function(){
  socket.emit('resultOf',thisusername)
})
socket.on("goodnumberchanged",howmany=>{//goodnumberchanged
  console.log("qazxswedcvfrtgb")
  //idから要素を特定
  var thebutt=document.getElementById("good-"+howmany.two)
  // :でわけ後半のほうに+-1する。
  if(thebutt!==null){
  let walk=thebutt.textContent.split(':')
  
   // walk[1]をintに変換してから+1 or -1する。
   var lala=parseInt(walk[1])
   if(howmany.one===0){
      //-1
       lala-=1
       
   }else{
    //+1
     lala+=1
   }
   console.log(thisusername+"this is the username right now on search page")
   if(howmany.three===thisusername){
     if(howmany.one===0){
   thebutt.textContent="♡:"+lala
   thebutt.classList.remove("pushedd")
     }else{
　　　thebutt.textContent="♥:"+lala
     thebutt.classList.add("pushedd")
     }
   }else{
     thebutt.textContent=walk[0]+":"+lala
   }
  }

})
socket.on("delete_message",thenumber=>{
  //thread pageを見ているユーザーの画面変更
  console.log("socket.on deleted message")
  var node=document.getElementById("cont-"+thenumber)
  if(node!==null){
  console.log("socket.on deleted message")
  node.innerHTML="This message actually has been deleted haha"
  node.classList.add("redline")
  var buttondele=document.getElementById("good-"+thenumber)
  buttondele.remove()
}
})


//socket.on('room-created', room => {
//    const roomElement = document.createElement('div')
//    roomElement.innerText = room
 //   const roomLink = document.createElement('a')
  //  roomLink.href = `/${room}`
  //  roomLink.innerText = 'join'
  //  roomContainer.append(roomElement)
  //  roomContainer.append(roomLink)
 // })




function appendMessage(sender,message, date01,id,good,ownMessage){
  //各要素にdatabaseのidをふる　まだやってない
  //!!!!!!!!!!!!!!!!!!!!!goodボタン付ける!!!!
  const messageElement=document.createElement('div')
  messageElement.classList.add("chatboxx")
  messageElement.setAttribute("id","boxx-"+id) 
    
    const sendername=document.createElement('p')
    sendername.classList.add("nameofSender")
    sendername.innerText=sender

    const thetime=document.createElement('p')
    thetime.classList.add("thetime")
    thetime.innerText=date01

    const thecontent=document.createElement('div')
    thecontent.classList.add("thecontent")
    thecontent.setAttribute("id","cont-"+id)
    thecontent.innerText=message
    
    //button
    const buttonline=document.createElement('div')

    const goodbutton=document.createElement('button')
    goodbutton.setAttribute("id","good-"+id)
    goodbutton.classList.add("cestpasmafaute")
    goodbutton.textContent="♡:"+good//👍 not yet
    //ここ、threadのところと重複してるからできれば一つにまとめたい
    goodbutton.onclick=function goodsend(){
      console.log("you dont knowwwww")
      var dutch;
      if (this.textContent.indexOf("♥")!==-1){
       dutch=0;
       //this.textContent
      }else{
        dutch=1
      }
          socket.emit("good",{gla: this.id.slice(5), which:dutch})//idでどのスレッドにいいねされたか特定しサーバーに送信
          //表示をまだ押してないときへ
　　　　　　　　//if not yet　　　　
        
          //表示をすでに押したへ
    }
    buttonline.append(goodbutton)

  if(ownMessage===true){
   
    messageElement.classList.add("myOwnmessage")
    //div class にして appendchildに
  }//メッセージが自分のだったら色変える
  messageElement.append(sendername) 
  messageElement.append(thecontent)
  messageElement.append(buttonline)
  messageElement.append(thetime) 
  messageContainer.append(messageElement)
   scrollTo(0, document.documentElement.scrollHeight);
}
//give time
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




//指定した文字数lengthで改行する
/*function splitByLength(str, length) {
  var resultArr = [];
  if (!str || !length || length < 1) {
      return resultArr;
  }
  var index = 0;
  var start = index;
  var end = start + length;
  while (start < str.length) {
      resultArr[index] = str.substring(start, end);
      index++;
      start = end;
      end = start + length;
  }
  return resultArr;
}  */
//console.log(daftpunk+"thoandmiles")

/*
if(daftpunk!==null){

  daftpunk.innerHTML=thisusername
  console.log('yeahm maybe its not ok since i saw you yesterday'+thisusername+namelocked)
}    */