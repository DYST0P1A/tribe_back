const mongoose = require('mongoose');
const Prod = mongoose.model('Product');


const productsCreate = async function(req, res) {
    try {
        const wear = await new Prod(req.body)

        await wear.save(async function(err) {
            if (err) {
                return res.status(500).send(err)
            }
        });

        return res.status(200).send('Success');
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

const productsByGender = async function(req, res) {
    try {
        const gender = req.body.gender
        const products = await Prod.find({ "gender": gender })
        if (products.length !== 0) {
            return res.status(200).send(products)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

const productsByCategory = async function(req, res) {
    try {
        const category = req.body.category
        const products = await Prod.find({ "category": category })
        if (products.length !== 0) {
            return res.status(200).send(products)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

const productById = async function(req, res) {
    try {
        const idReq = req.body.id
        const product = await Prod.findById(idReq)
        if (product) {
            return res.status(200).send(product)
        } else {
            return res.status(404).json({ "message": "Producto no encontrado" })
        }
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

module.exports = {
    productsCreate,
    productsByGender,
    productsByCategory,
    productById
};