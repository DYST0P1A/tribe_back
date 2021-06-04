const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    id_item: {
        type: String,
        required: true
    },
    sizeSelected: {
        type: String,
        required: false,
        default: ""
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    valoration: {
        type: Number,
        enum: [ -1, 1, 2, 3, 4, 5 ],
        default: -1
    },
    emailSeller: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['brand', 'user'],
        required: true
    },
})



const orderSchema = new mongoose.Schema({
    emailClient: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false,
        default: Date()
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    cart: [itemsSchema]
});

mongoose.model('Order', orderSchema);