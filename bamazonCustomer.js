// included dependencies 
const inquirer = require("inquirer");
const mysql = require("mysql");

// create connection to database
const db = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "",
    database: "bamazon_db"
});

// turn connection to database on
db.connect(err => {
    // if (err) throw err;
    console.log(`Database connection sucessfull! ${db.threadId}`);

    buyItem();
});

// promts the user to view the list of items for sale by hitting "enter"
const buyItem = () => {
    inquirer.prompt([
        {
            name: "itemList",
            message: "Items for Sale",
            type: "list",
            choices: ["Enter", "Exit"]

        }
    ])
    .then(answer => {
        (answer.buyItem === "Enter")
        // Display items for sale
        itemList();
    })

}

// List of items for sale with a prompt that asks for item ID 
const itemList = () => {
    db.query("SELECT * FROM id WHERE products", (err, products) => {
        // if (err) throw err;

        inquirer.prompt([
            {
                name: "id",
                message: "Items for sale",
                type: "list",
                choices: products.map(products => products.product_name)
            },
            {
                name: "product_name",
                message: "Which Item are you interested in buying?",
                type: "input",
                validate: function(itemId) {
                    if (!isNaN(itemId)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            
        ]).then(selectedId => {
            const selectedItem = products.find(product => product.id === itemId.id);
        })
    })
}



