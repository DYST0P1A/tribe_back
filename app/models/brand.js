const mongoose = require('mongoose');
require('dotenv').config();

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: false
    },
    logo: {
        type: String,
        required: true
    },
    telephone: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    id_products: [{
        type: String
    }]
});

mongoose.model('Brand', brandSchema);