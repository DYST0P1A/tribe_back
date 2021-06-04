const mongoose = require('mongoose');
const Prod = mongoose.model('Product');

const updateFavorites = async function(req, res) {
    try {
        const user = req.user
        const id_item = req.body.id_item

        if (req.body.operation === "insert") {
            user.favorites = await user.favorites.concat({ id_item })
            await user.save(async function(err) {
                if (err) {
                    return res.status(500).send(err)
                }
            });
        } else if (req.body.operation === "delete") {
            user.favorites.splice(user.favorites.findIndex(e => e.id_item === id_item), 1);
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

const getFavorites = async function(req, res) {
    try {
        const user = req.user
        let favorites = []
        for (var i in user.favorites) {
            let idItem = user.favorites[i].id_item

            let item = await Prod.findById(idItem)
            if (item) {
                favorites.push(item)
            } else {
                return res.status(404).json({ "message": "Producto no encontrado" })
            }
        }

        return res.status(200).send({ favorites });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "error" })
    }
}


module.exports = {
    updateFavorites,
    getFavorites
};