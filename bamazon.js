var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table");
//var Table = require("cli-table");



var con = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });


 
  //console.table(["Audi", "Volvo", "Ford"]);

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT item_id,product_name, price FROM products", function (err, result, fields) {
      if (err) throw err;
      printTable(result);
     getOrder();
     // console.log(table);
    });
  });

  function printTable(result) {
    console.log("                                                                 ");
    console.log("************************WELCOME TO BAMAZON***********************");
    console.log("             Following Item are available for sale");
    console.log("                                                                ");
    console.table(result);
  }
  function getOrder() {
  inquirer.prompt([
    {
      name: "name",
      message: "Please enter your user name?"
    }, {
      name: "item_id",
      message: "What would you like to order, Please provide Item_ID ?"
    }, {
      name: "quantity",
      message: "Please provide order quantity ?"
    }
  ]).then(function(answers) {
 
    console.log(answers);
    placeOrder(answers);
   
  });
}


function placeOrder(answers) {


    con.query("SELECT * FROM products where item_id =" + answers.item_id, 
   
    
    function (err, result, fields) {
      if (err) throw err;
      var quantity = result.stock_quantity - answers.quantity;
     if(quantity > 0) {
        var query = con.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: answers.quantity
            },
            {
              item_id: answers.item_id
            }
          ],
          function(err, res) {
          console.log(err); 
          
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            
          }
        );
     }
     console.log(result);
    });
 

}

