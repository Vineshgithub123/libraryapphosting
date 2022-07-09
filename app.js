const express = require('express');
const cors = require('cors')
// const mongoose = require('mongoose')
const{bookslist,signupdetails} = require('./src/model/model')
const bodyparser = require('body-parser')
const path = require('path')
// mongoose.connect('mongodb://localhost:27017/LIBRARYAPP');
// 1vBR7DlZsYaAVdjg

const mongoose = require('mongoose');
const db = 'mongodb+srv://Vin_lib:1vBR7DlZsYaAVdjg@libraryapp.ret7zjx.mongodb.net/retryWrites=true&w=majority'
mongoose.connect(db, { 
        useNewUrlParser: true,
      })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const jwt = require('jsonwebtoken')
const app = new express();
app.use(cors());
app.use(bodyparser.json())
app.use(express.json({ urlencoded: true }));
 
app.use(express.static('./dist/app-frontend'))

 

// function verifyToken(req,res,next){
//   if(!req.headers.authorization){
//       return res.status(401).send('Unauthorized request')
//   }
//   let token = req.headers.authorization.split('')[1]
//   if(token=='null'){
//       return res.status(401).send('Unauthorized request')
//   }
//   let payload=jwt.verify(token,'secretkey')
//   console.log(payload)
//   if(!payload){
//       return res.status(401).send('Unauthorized request')
//   }
//   req.userId=payload.subject
//   next()
// }
app.post("/api/signup",function(req,res){

  console.log(req.body);
    var user={
      
      fullname: req.body.fullname,
      mobile:req.body.mobile,
      email:req.body.email,
      password:req.body.password
  }  
  var newuser = new signupdetails(user);
  console.log(newuser);
  newuser.save();
  res.send();
     });


app.post('/api/insert',function(req,res){
console.log(req.body._id);
  var products={
    Imageurl:req.body.item.Imageurl,
    Authorname:req.body.item.Authorname,
    Genre:req.body.item.Genre,
    Bookcode:req.body.item.Bookcode,
    Bookname:req.body.item.Bookname
  }
  var product = new bookslist(products);
  product.save()
})
app.get('/api/Books',function(req,res){

  bookslist.find()
  .then(function(books){
      res.send(books)
  })

})

  app.get('/api/:id',(req,res)=>{
    const id =req.params.id;
    bookslist.findOne({"_id":id})
    .then((books)=>{
      res.send(books);
    })

  })

  

  app.delete('/api/remove/:id',(req,res)=>{
    id=req.params.id;
    bookslist.findByIdAndRemove({"_id":id})
    .then(()=>{
      console.log('success')
      res.send();
    })
  })



  app.put('/api/update',(req,res)=>{
    console.log(req.body)
    id=req.body._id
    Bookcode=req.body.Bookcode,
    Imageurl=req.body.Imageurl,
    Authorname=req.body.Authorname,
    Genre=req.body.Genre,
    Bookname=req.body.Bookname
    bookslist.findByIdAndUpdate({"_id":id},
                                {$set:{
                                "Bookcode":Bookcode,
                                "Imageurl":Imageurl,
                                "Authorname":Authorname,
                                "Genre":Genre,
                                "Bookname":Bookname,
                                }})
   .then(function(){
       res.send();
   })
 })
 app.delete('/api/remove/:id',(req,res)=>{
   id= req.params.id;
   bookslist.findByIdAndDelete({"_id":id})
   .then(()=>{
     console.log('success');
     res.send();
   })
 })




  //  app.post('/insert',function(req,res){
  //   console.log(req.body._id);
  //     var products={
  //       Imageurl:req.body.item.Imageurl,
  //       Authorname:req.body.item.Authorname,
  //       Genre:req.body.item.Genre,
  //       Bookcode:req.body.item.Bookcode,
  //       Bookname:req.body.item.Bookname
  //     }
  //     var product = new Booklists(products);
  //     product.save()
  //   })


app.post('/api/login',function(req,res){
  console.log(req.body);
var email = req.body.email;
var password = req.body.password
console.log(email);
signupdetails.findOne({email})
.then(users=>{
  console.log(users);

  if(users&&users.password==password){
  return res.json('success')
  }else{
    res.status(401).send('Please Enter Email andPassword')
  }
})



})

app.get('/*',function(req,res){
  res.sendFile(path.join(__dirname + '/dist/app-frontend/index.html'))
})



app.listen(3000,function(){
  console.log('running on port 3000');
});