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
    brand_id: {
        type: String,
        required: true
    },
    brand_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Men', 'Women', 'Unisex', 'Baby'],
        required: true
    },
    color: {
        type: String,
        required: false //????????? existe algo para colores en mongoose?
    }
});



mongoose.model('Product', productSchema);