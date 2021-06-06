const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
    sizes: [{
        size: {
            type: String,
            required: false
        }
    }],
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
        default: 'brand'
    },
    brand_id: {
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
    score: {
        type: Number,
        required: false,
        default: 0
    },
    numScores: {
        type: Number,
        required: false,
        default: 0
    }
});



mongoose.model('Product', productSchema);