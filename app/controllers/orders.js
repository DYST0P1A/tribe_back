const mongoose = require('mongoose');
const Order = mongoose.model('Order');


const ordersCreate = async function(req, res) {
    try {
        const cartUser = req.user.cart
        const order = []

        var date = new Date(+new Date() + 2 * 60 * 60 * 1000)
        order.date = date
        order.totalPrice = req.user.totalPrice
        order.emailClient = req.user.email

        let cart = []
        for (var i in cartUser) {
            const id_item = cartUser[i].id_item
            const sizeSelected = cartUser[i].sizeSelected
            const quantity = cartUser[i].quantity
            const emailSeller = cartUser[i].emailSeller
            const type = cartUser[i].type
            cart.push({ "id_item": id_item, "sizeSelected": sizeSelected, "quantity": quantity, "emailSeller": emailSeller, "type": type })
        }
        order.cart = cart
        const orderInsert = await new Order(order)

        await orderInsert.save(async function(err) {
            if (err) {
                return res.status(500).send(err)
            }
        });

        const user = req.user
        user.cart = []
        user.totalPrice = 0
        await user.save(async function(err) {
            if (err) {
                return res.status(500).send(err)
            }
        });

        return res.status(200).send('Success');
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "error" })
    }
}


const getOrders = async function(req, res) {
    try {
        const email = req.user.email

        const orders = await Order.find({ "emailClient": email })
        if (orders.length !== 0) {
            return res.status(200).send(orders)
        } else {
            return res.status(200).send([])
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "error" })
    }
}


module.exports = {
    ordersCreate,
    getOrders
};