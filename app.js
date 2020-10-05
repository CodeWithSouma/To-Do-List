const config = require('config');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");
const helmet = require('helmet');
const compression = require('compression');
const _ = require('lodash');


const app = express();
app.use(helmet());
app.use(compression());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
// this is a static resource or public resource
app.use(express.static("public"));

//connect mongodb database 
const db = config.get('db');
mongoose.connect(db, {useNewUrlParser: true,useUnifiedTopology: true})
        .then(() => console.log(`Connected to ${db}`));
// we create a item schema
const itemsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});

//create a new schema for custom list
const listSchema = new mongoose.Schema({
    name:String,
    items:[itemsSchema]
});

// this model is use for item 
const Item = new mongoose.model("Item",itemsSchema);
//this model is use for custom list
const List = new mongoose.model("List",listSchema);

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
            res.render("list",{listTitle:"Today",newListItems:foundItem});
        }
        
    });
    
});

// add a dynamic route using express route paramter
app.get("/:customListName",function(req,res){
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name:customListName},function(err,foundList){
        if (!err) {
            if (!foundList) {
                const list = new List({
                    name:customListName,
                    items:defaultItems
                });
                list.save();
                res.redirect("/"+customListName);
            }else{
                res.render("list",{listTitle:foundList.name,newListItems:foundList.items});
            }
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

    const item = req.body.newItem.trim();
    const listName = req.body.button;
    
    if(listName === "Today"){
        if(item!==""){
            //insert item into database
            const newItem = new Item({name:item});
            newItem.save();
        }
        res.redirect("/");
    }
    else{
        List.findOne({name:listName},function(err,foundList){
            foundList.items.push({name:item});
            foundList.save();  
        });
        res.redirect("/"+listName);
        
    }      

});


// /delete route 
app.post("/delete",function(req,res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today"){

        Item.deleteOne({_id:checkedItemId},function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("the item was succesfully deleted.");
            }
            res.redirect("/");
        });
    }else{
        List.findOneAndUpdate({name:listName},{$pull:{items: {_id:checkedItemId}}}, function(err,foundList){
            if(!err){
                res.redirect("/"+listName);
            }
        })
    }
});


// server start deploy port 
const port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log(`Server is Ranning at port ${port}...`);
});

