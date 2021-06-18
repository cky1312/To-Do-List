
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

var items = ["Buy", "Sell"];
let workItems = [];
app.get("/", (req, res) => {

    let day = date();

    res.render("list", { ListTitle: day, newListItem: items });

});

app.post("/", (req, res) => {
    var item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }

    else {
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", (req, res) => {
    res.render("list", { ListTitle: "Work List", newListItem: workItems });
});

app.get("/about", (req, res) =>{
    res.render("about");
});

app.post("/work", (req, res) => {
    let item = req.body.newItems;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(4000, () => {
    console.log("Server started on port 4000.");
});
