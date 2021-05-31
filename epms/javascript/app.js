"use strict";

const express = require("express");
const app = express();
const fs = require("fs");

let query = require("./query.js");
let registerUser = require("./registerUser.js");
let registerAdmin = require("./enrollAdmin.js");
let buyEpms = require("./buyEpms.js");
let buyMetroTickets = require("./buyMetroTickets.js");
let payPredial = require("./payPredial");

//register admin
app.post("/admin", async function (req, res) {
    let message = await registerAdmin();
    res.send(message);
});

//register user
app.post("/user", async function (req, res) {
    let message = await registerUser();
    res.send(message);
});

// Query on chaincode on target peers
app.get("/query", async function (req, res) {
    let message = await query.query();
    res.send(message);
});

app.put("/buyepms", async function (req, res) {
    console.log(req.query.number);
    let message = await buyEpms.buyEpms(req.query.number, req.query.amount);
    res.send(message);
});

app.put("/buymetrotickets", async function (req, res) {
    console.log(req.query.number);
    let message = await buyMetroTickets.buyMetroTickets(
        req.query.number,
        req.query.amount
    );
    res.send(message);
});

app.put("/paypredial", async function (req, res) {
    console.log(req.query.number);
    let message = await payPredial.payPredial(
        req.query.number,
        req.query.amount
    );
    res.send(message);
});

app.listen(8080, () => {
    console.log("server is running on port" + 8080);
});
