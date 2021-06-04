const mongoose = require('mongoose');
const Prod = mongoose.model('Product');

const updateCart = async function (req, res) {
    try {
        const user = req.user
        const id_item = req.body.id_item
        const quantity = req.body.quantity
        const sizeSelected = req.body.sizeSelected
        const type = req.body.type
        const emailSeller = req.body.emailSeller
        console.log(type)
        console.log(emailSeller)

        if (req.body.operation === "insert") {
            user.cart = await user.cart.concat({
                "id_item": id_item, "quantity": quantity, "sizeSelected": sizeSelected,
                "emailSeller": emailSeller, "type": type
            })
            console.log(user.cart)
            await user.save(async function (err) {
                if (err) {
                    return res.status(500).send(err)
                }
            });
        } else if (req.body.operation === "delete") {
            user.cart.splice(user.cart.findIndex(e => e.id_item === id_item), 1);
            await user.save(async function (err) {
                if (err) {
                    return res.status(500).send(err)
                }
            });
        } else {
            return res.status(404).send({ "message": "Operación no reconocida" })
        }

        return res.status(200).send('Success');
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

const getCart = async function (req, res) {
    try {
        const user = req.user
        let cart = [],
            totalPrice = 0

        for (var i in user.cart) {
            let idItem = user.cart[i].id_item

            let item = await Prod.findById(idItem)
            if (item) {
                totalPrice = totalPrice + item.price * user.cart[i].quantity
                cart.push({ "item": item, "quantity": user.cart[i].quantity, "sizeSelected": user.cart[i].sizeSelected })
            } else {
                return res.status(404).json({ "message": "Producto no encontrado" })
            }
        }

        return res.status(200).send({ totalPrice, cart });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "error" })
    }
}


module.exports = {
    updateCart,
    getCart
};