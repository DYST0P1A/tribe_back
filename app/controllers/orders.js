const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const Prod = mongoose.model('Product');
const ProdUsed = mongoose.model('ProductUsed');


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


const valorateProductOrder = async function(req, res) {
    try {
        const id_order = req.body.id_order
        const id_product = req.body.id_product
        const valoration = req.body.valoration

        const order = await Order.findById(id_order)
        if (!order) {
            return res.status(404).send({ "message": "Pedido no encontrado" })
        }

        let found = false
        for (var i in order.cart) {
            if (order.cart[i].id_item === id_product) {
                order.cart[i].valoration = valoration
                found = true
            }
        }
        if (!found) {
            return res.status(404).send({ "message": "Producto del pedido no encontrado" })
        }
        await order.save(async function(err) {
            if (err) {
                return res.status(500).send(err)
            }
        });

        const product = await Prod.findById(id_product)
        if (!product) {
            return res.status(404).send({ "message": "Producto para valorar no encontrado" })
        } else {
            product.numScores = product.numScores + 1
            product.score = product.score + valoration
            await product.save(async function(err) {
                if (err) {
                    return res.status(500).send(err)
                }
            });
        }
        return res.status(200).send('success')
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "error" })
    }
}

const productUsedOrder = async function(req, res) {
    try {
        const id_productUsed = req.body.idProductUsed
        const productUsed = await ProdUsed.findById(id_productUsed)
        if (!productUsed) {
            return res.status(404).send({ "message": "Producto no encontrado" })
        }

        let order = new Order()
        order.emailClient = req.user.email
        var date = new Date(+new Date() + 2 * 60 * 60 * 1000)
        order.date = date
        order.totalPrice = productUsed.price
        order.cart = []

        const id_item = id_productUsed
        const sizeSelected = productUsed.size
        const quantity = 1
        const valoration = -1
        const emailSeller = productUsed.emailSeller
        const type = 'user'

        order.cart.push({ "id_item": id_item, "sizeSelected": sizeSelected, "quantity": quantity, "valoration": valoration, "emailSeller": emailSeller, "type": type })

        await order.save(async function(err) {
            if (err) {
                return res.status(500).send(err)
            }
        });
        return res.status(200).send('success')

    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

module.exports = {
    ordersCreate,
    getOrders,
    valorateProductOrder,
    productUsedOrder
};