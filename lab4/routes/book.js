var express = require('express');
var router = express.Router();
var books = require("./../model/books");
var users = require("./../model/users");

router.get("/:id([0-9]{1,})", function (req,res,next) {
    var id = req.params.id;
    var book = books.filter((book)=>{
        return book.id==id;
    })[0];
    var user={};
    if(book.borrowedBy != -1)
        user = users.filter((user)=>{
            return user.id == book.borrowedBy;
        })[0];

    res.render("book",{
        title:book.name,
        js:"javascripts/book.js",
        book:book,
        user:user
    })
})


module.exports=router;