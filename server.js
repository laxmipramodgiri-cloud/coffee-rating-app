const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const coffeeFile = path.join(__dirname, "coffees.json");

// Get all coffees
app.get("/coffees", (req, res) => {
fs.readFile(coffeeFile, "utf8", (err, data) => {
if (err) {
return res.status(500).json({ error: "Unable to read coffees" });
 }

res.json(JSON.parse(data));
});
});

// Vote for a coffee
app.post("/coffees/:id/vote", (req, res) => {
fs.readFile(coffeeFile, "utf8", (err, data) => {
if (err) {
return res.status(500).json({ error: "Unable to read coffees" });
}

const coffees = JSON.parse(data);
const coffeeId = Number(req.params.id);

const coffee = coffees.find(item => item.id === coffeeId);

if (!coffee) {
return res.status(404).json({ error: "Coffee not found" });
 }

coffee.votes += 1;

fs.writeFile(
coffeeFile,
JSON.stringify(coffees, null, 2),
err => {
if (err) {
return res.status(500).json({ error: "Unable to save vote" });
}

res.json(coffee);
            }
);
});
});

app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});