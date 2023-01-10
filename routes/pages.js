const express= require('express');
//const abc=require('../Apap')
const router=express.Router();
//var access2=require('../public/users.js')

router.get('/',(req,res)=>{// localhost:5000/の意味
    console.log("accessed by a user")
    res.render('auth/login');
});
router.get('/nonthread',(req,res)=>{// localhost:5000/の意味        
    console.log("dont know what ")
    res.render('nonthread')
});
router.get('/index', (req, res)=>{
    res.render('auth/index')
})

router.get('/thread',(req,res)=>{// localhost:5000/の意味
    if(req.session.logedin){
    console.log("get thread yeah boy "+req.session.logedin)
    //here put a name in the array
   abc.access(req.session.name)
    res.render('auth/thread', {name: req.session.name+'でログイン中'})
    }else{
        
    }
});


//router.get('/:room', (req, res) => {
//    if (rooms[req.params.room] == null) {
//      return res.redirect('/')
//    }
//    res.render('room', { roomName: req.params.room })
//  })


module.exports=router;// to use router in iuiu