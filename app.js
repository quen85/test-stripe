const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const app = require("express")();
const express = require("express");
const stripe = require("stripe")(keySecret);

var port = process.env.PORT || 8080;
let amount;

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({extended: false}));
app.use('/public', express.static('public'));

app.get("/pay", (req, res) =>
res.render("index.pug", {keyPublishable}));

app.post("/pay", (req, res) =>{
    amount = req.body.amount;
    res.render("index.pug", {keyPublishable, amount: req.body.amount})}
);

app.get("/", (req, res) =>
res.render("cart.pug"));

app.post("/charge", (req, res) => {
    amount = amount * 100;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
        .then(customer =>
    stripe.charges.create({
        amount,
        description: "Sample Charge",
        currency: "eur",
        customer: customer.id
    }))
    .then(charge => res.render("charge.pug", {amount: amount/100}));
});