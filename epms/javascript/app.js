"use strict";

const express = require("express");
const app = express();
const fs = require("fs");

let query = require("./query.js");
let registerUser = require("./registerUser.js");
let registerAdmin = require("./enrollAdmin.js");

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

app.listen(8080, () => {
    console.log("server is running on port" + 8080);
});
