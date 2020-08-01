// ***********Main funda *********************
// we collect data from the input field and make 
// an array of items/work and pass that array back to the template 
// and iterate that array using foreach loop and and add the list item

const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
// this is a static resource or public resource
app.use(express.static("public"));

// global veriable
// initially we set these 3 item 
let items =["Buy Food","Cook Food","Eat Food"];
let work =[];

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
    // here we pass current date as a list title and a array 
    res.render("list",{listTitle:day,newListItems:items});
});

// work route get get requset
app.get("/work",function(req,res){
    // here we pass work string as a list title and work array 
    res.render("list",{listTitle:"Work",newListItems:work});
});

// about route 
app.get("/about",function(req,res){
    // we send about page
    res.render("about");
})

// home route post request
app.post("/",function(req,res){
    
    // we take the item from post request, 
    // if it is not empty string then push it 
    // into the items array 
     item = req.body.newItem.trim();
    //  if template title /Button value = Work then push the element
    // into the work array and redirect route to /work otherwise push
    // the element into the items array and redirect to / route
    if(req.body.button === "Work"){
        if(item!==""){
            work.push(item);
         }
        // console.log(item);
        res.redirect("/work");
    }
    else{
        if(item!==""){
            items.push(item);
         }
        // console.log(item);
        res.redirect("/");
    }
});


// server start deploy port 
app.listen(3000,function(){
    console.log("Server is Ranning at port 3000.")
});

