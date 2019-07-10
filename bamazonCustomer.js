var inquirer = require("inquirer");
var Table = require('cli-table');
var mysql = require("mysql");


var connection = mysql.createConnection({
 host: "localhost",

 // Your port; if not 3306
 port: 3306,

 // Your username
 user: "root",

 // Your password
 password: "rootroot",
 database: "bamazon"
});


function displayTable(){
    var table = new Table({
        head: ['Item ID', 'Product Name', 'Price', 'Stock Quantity']
      , colWidths: [5, 20, 10, 10]
    });
     
    
    var itemArr = [];
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;

        for( var i=0; i<results.length; i++){
            var itemObj = {
                item_id: results[i].item_id,
                product_name: results[i].product_name,
                price: results[i].price,
                stock_quantity: results[i].stock_quantity
            };
            itemArr.push(itemObj);
        };
        for (var i=0; i<itemArr.length; i++){
                table.push(
                    [itemArr[i].item_id, itemArr[i].product_name, itemArr[i].price, itemArr[i].stock_quantity]
                );
        }
     console.log(table.toString());
     custQuestion();
    });  
};
 
displayTable();

function custQuestion(){

    inquirer.prompt([
    {
        type: 'input',
        name: 'item_id',
        message: 'What is the ID number to the product you would like to buy?'
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many units would you like to buy?'
    }
]).then(function(answer){
    var itemId = answer.item_id - 1;
    var updateQuant;
    var newId = answer.item_id;
    connection.query("SELECT * FROM products", function(err, results){
        // console.log(results[itemId].stock_quantity);
        if(answer.quantity > results[itemId].stock_quantity) {
            console.log("Insuffienct Items");
            displayTable();
        } else {
            console.log("you bought " + answer.quantity);
           var dataResult = results[itemId].stock_quantity;
           updateQuant = dataResult - answer.quantity;
        };
        updateQuantity(updateQuant, newId);
        
    });
});
};
   
function updateQuantity(newStock, newId) {

connection.query(

    "UPDATE products SET ? WHERE ?", 
    [
        {
            stock_quantity: newStock
        },
        {
            item_id: newId
        }
    ],
    function(err,res) {
    if (err) throw err;
    }
)
displayTable();
}