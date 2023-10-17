import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var itemsToday = [];
var itemsWork = [];

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Server is now listening on port: ${port}`)
})

app.get("/", (req, res) => {
    res.render("index.ejs", {
        listName: getFull(),
        items: itemsToday
    })
})

app.get("/work", (req, res) => {
    res.render("work.ejs", {
        listName: "Go and take it!",
        items: itemsWork
    })
})

app.post("/", (req, res) => {
    itemsToday.push(req.body.newItem)
    res.render("index.ejs", {
        listName: getFull(),
        items: itemsToday
    })
})

app.post("/work", (req, res) => {
    itemsWork.push(req.body.newItem)
    res.render("work.ejs", {
        listName: "Go and take it!",
        items: itemsWork
    })
})

function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }

function getFull() {
    const currentDate = new Date();
    const dayOfWeek = getDayOfWeek(currentDate);
    const monthName= currentDate.toLocaleString('en-In', {month:'long'});
    const currentDay = currentDate.getDate();
    const dateToGo = `${dayOfWeek}, ${monthName} ${currentDay}`;
    return dateToGo;
}