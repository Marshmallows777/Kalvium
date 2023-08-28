const express = require("express");
const app = express();

const PORT = 3000;

const operatorMappings = {
    plus: "+",
    minus: "-",
    into: "*",
    by: "/",
};

let history = [];

app.get("/", (req, res) => {
    res.send("Welcome to the Math Operation Server");
});

app.get("/history", (req, res) => {
    res.json(history);
});

app.get("/:nums/:operator/:nums2/:operator2?/:nums3?", (req, res) => {
    const { nums, operator, nums2, operator2, nums3 } = req.params;

    const operatorSymbol = operatorMappings[operator];
    const operator2Symbol = operator2 ? operatorMappings[operator2] : "";

    const expression =
        `${nums} ${operatorSymbol} ${nums2}` +
        (nums3 ? ` ${operator2Symbol} ${nums3}` : "");
    const answer = evaluateExpression(expression);

    const historyEntry = { question: expression, answer: answer };
    history.push(historyEntry);
    if (history.length > 20) {
        history.shift();
    }

    res.json(historyEntry);
});

function evaluateExpression(expression) {
    return eval(expression);
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});