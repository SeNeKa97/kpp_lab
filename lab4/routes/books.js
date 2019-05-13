var express = require('express');
var router = express.Router();
var books = require("./../model/books");

router.get("/", function (req,res,next){
    res.render("books", {
        title:"Книги в библиотеке",
        books:books,
        js:"javascripts/books.js"
    })
});

router.post("/filter", function (req,res,next) {
    const body = req.body;
    var filtered;

    if(body.filterParam=="all"){
        filtered = books.filter(function (book) {
            return true;
        });
    }else if(body.filterParam=="present"){
        filtered = books.filter(function (book) {
            return book.borrowedBy==0;
        });
    }else if(body.filterParam=="absent"){
        filtered = books.filter(function (book) {
            return book.borrowedBy>0;
        });
    }

    res.end(JSON.stringify(filtered));
})

module.exports=router;