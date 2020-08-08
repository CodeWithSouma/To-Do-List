// ***********Main funda *********************
// we collect data from the input field and make 
// an array of items/work and pass that array back to the template 
// and iterate that array using foreach loop and and add the list item

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");
const date = require(__dirname+"/date.js");


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
// this is a static resource or public resource
app.use(express.static("public"));

//connect mongodb database 
mongoose.connect('mongodb://localhost/todolistDB', {useNewUrlParser: true,useUnifiedTopology: true});
// we create a item schema
const itemsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});

// this model is use for item 
const Item = new mongoose.model("Item",itemsSchema);


//create 3 document for default 3 item
const item1 = new Item({
    name:"Wellcome to todo list"
});

const item2 = new Item({
    name:"Click + to add new list item"
});

const item3 = new Item({
    name:"Press - to delete list item"
});
// default item array
const defaultItems = [item1,item2,item3];


// home route get request
app.get("/",function(req,res){
    let day = date.getDate();//call the getDate function using date module
    //fetch all items and put into ejs template and send file
    Item.find({},function(err,foundItem){
    
        if(foundItem.length === 0){
            //insert all of default item into our items collection
            Item.insertMany(defaultItems,function(err){
                if(err)
                    console.log(err);
                else
                    console.log("Default items are succesfully saved into DB.");
            });
            //saved default item and redirect to / route
            res.redirect("/");
        }else{
            res.render("list",{listTitle:day,newListItems:foundItem});
        }
        
    });
    
});

// about route 
app.get("/about",function(req,res){
    // we send about page
    res.render("about");
})

// home route post request
app.post("/",function(req,res){
    
    
     item = req.body.newItem.trim();

    if(item!==""){
        //insert item into database
        const newItem = new Item({name:item});
        newItem.save();
    }
    // console.log(item);
    res.redirect("/");
   

});


// /delete route 
app.post("/delete",function(req,res){
    const checkedItemId = req.body.checkbox;
    Item.deleteOne({_id:checkedItemId},function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("the item was succesfully deleted.");
        }
        res.redirect("/");
    })
});


// server start deploy port 
app.listen(3000,function(){
    console.log("Server is Ranning at port 3000.")
});

