const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if(!username){
      return res.status(400).json({message:"username not provided"})
    }
    if(!password){
      return res.status(400).json({message:"password must not be blank"})
    }   
  let filtered_users = users.filter((user) => user.username === username);
  if (filtered_users.length > 0) {
      return res.status(403).json({message:"username already exist"}) 
  }
  
  users.push({username:username, password:password});
    return res.status(200).json({message:"User registered successfully"});
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
const isbn = req.params.isbn;
  let result = books[isbn];
  if(result){
    return res.status(200).json(result);
  }else{
    return res.status(404).json({message: "Not Found"});
  }

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
 const author = req.params.author;
  const keys = Object.keys(books);
  let result = [];
  for(let i=1; i<=keys.length; i++){
    let book = books[i];
    if(author==book.author){
        result.push(book);
    }
    
  }
  return res.status(200).json(result);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

const title = req.params.title;
    const keys = Object.keys(books);
    let result = [];
    for(let i=1; i<=keys.length; i++){
      let book = books[i];
      if(title==book.title){
          result.push(book);
      }    
    }
  return res.status(200).json(result);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let result = books[isbn];
  if(result){
    return res.status(200).json(result.reviews);
  }else{
    return res.status(404).json({message: "Not Found"});
  }
});

module.exports.general = public_users;
