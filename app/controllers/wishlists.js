const mongoose = require('mongoose');
const Prod = mongoose.model('Product');

const updateWishList = async function(req, res) {
    try {
        const user = req.user
        const id_item = req.body.id_item

        if (req.body.operation === "insert") {
            user.wishlist = await user.wishlist.concat({ id_item })
            await user.save(async function(err) {
                if (err) {
                    return res.status(500).send(err)
                }
            });
        } else if (req.body.operation === "delete") {
            user.wishlist.splice(user.wishlist.findIndex(e => e.id_item === id_item), 1);
            await user.save(async function(err) {
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

const getWishlist = async function(req, res) {
    try {
        const user = req.user
        let wishlist = []
        for (var i in user.wishlist) {
            let idItem = user.wishlist[i].id_item

            let item = await Prod.findById(idItem)
            if (item) {
                wishlist.push(item)
            } else {
                return res.status(404).json({ "message": "Producto no encontrado" })
            }
        }

        return res.status(200).send({ wishlist });
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}


module.exports = {
    updateWishList,
    getWishlist
};