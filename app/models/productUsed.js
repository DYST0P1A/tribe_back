const mongoose = require('mongoose');

const productUsedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: false
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: false
    },
    images: [{
        image: {
            type: String,
            required: true
        }
    }],
    type: {
        type: String,
        enum: ['brand', 'user'],
        required: true,
        default: 'user'
    },
    nameSeller: {
        type: String,
        required: false
    },
    emailSeller: {
        type: String,
        required: false
    },
    brand_name: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ['Men', 'Women', 'Unisex', 'Baby'],
        required: true
    },
    color: {
        type: String,
        required: false
    },
    valoration: {
        type: Number,
        enum: [-1, 1, 2, 3, 4, 5],
        default: -1
    },
    sold: {
        type: Number,
        enum: [0, 1],
        default: 0
    }
});



mongoose.model('ProductUsed', productUsedSchema);