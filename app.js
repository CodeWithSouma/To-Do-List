// ***********Main funda *********************
// we collect data from the input field and make 
// an array of items and pass that array back to the template 
// and iterate that array using foreach loop and and add the list item

const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

// global veriable
// initially we set these 3 item 
let items =["Buy Food","Cook Food","Eat Food"];


// home route get request
app.get("/",function(req,res){
    let today = new Date();
    // this object pass for formate the date 
    let option = {
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    let day = today.toLocaleDateString("en-US",option);
    // here we pass current date and a array 
    res.render("list",{kindOfDay:day,newListItems:items});
});

// home route post request
app.post("/",function(req,res){

    // we take the item from post request, 
    // if it is not empty string then push it 
    // into the items array 
     item = req.body.newItem.trim();
     if(item!==""){
        items.push(item);
     }
    // console.log(item);
    res.redirect("/");
});
// server start deploy port 
app.listen(3000,function(){
    console.log("Server is Ranning at port 3000.")
});

