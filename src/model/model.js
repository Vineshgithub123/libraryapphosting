const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const Books = new mongoose.Schema({
Bookcode:Number,
Imageurl:String,
Authorname:String,
Genre:String,
Bookname:String

})

const Signup = new mongoose.Schema({
    fullname: String,
    mobile:Number,
    email:String,
    password:Number
})
const signupdetails = mongoose.model('signups',Signup)
const bookslist = mongoose.model('books', Books);


module.exports= {
    bookslist,signupdetails
}