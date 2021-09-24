require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { json, urlencoded } = require('body-parser');

const { Schema } = mongoose;

const orderItemSchema = new Schema({
    count: Number,
    brand: String,
    subBrand: String,
    region: String,
    country: String
})

const preorderSchema = new Schema({
    contact: String,
    order: [orderItemSchema]
})

const Preorder = mongoose.model('Preorder', preorderSchema)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

const postPreorders = async (req, res) => {
    try {
        const { contact, order } = req.params;

        const preorder = await Preorder.create({ contact, order });


        res.json(preorder);
    } catch (error) {
        res.send(error.message)
    }
}

app.post('/preorders', postPreorders);


const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Your app is listening on port ' + port)
});