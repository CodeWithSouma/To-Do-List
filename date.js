// we pass two function as a module object 
// when need to call the function simply add date package and
// call using constant like this canst date = require(__dirname+"/date,js");
// console.log(date.getDate()) or console.log(date.getDay()) here we add parenties bqz 
// we want to call getDate()/getDay function from date object

// this module return curent date 
module.exports.getDate =  function(){
    let today = new Date();
    // this object pass for formate the date 
    let option = {
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    return today.toLocaleDateString("en-US",option);   
};

// this module return current day of the week
module.exports.getDay = function(){
    let today = new Date();
    // this object pass for formate the date 
    let option = {
        weekday:"long",
    };

    return today.toLocaleDateString("en-US",option);
    
};