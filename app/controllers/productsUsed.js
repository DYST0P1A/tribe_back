const mongoose = require('mongoose');
const ProdUsed = mongoose.model('ProductUsed');
const Order = mongoose.model('Order')


const productsUsedCreate = async function(req, res) {
    try {
        if (req.user.type !== "client") {
            return res.status(403).send({ "message": "No posees permisos para esta accion" })
        }

        const wear = await new ProdUsed(req.body)

        await wear.save(async function(err) {
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

const getProductsUsed = async function(req, res) {
    try {
        const products = await ProdUsed.find({})
        if (products.length !== 0) {
            return res.status(200).send(products)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "error" })
    }
}

const productsUsedByBrand = async function(req, res) {
    try {
        const brand = req.body.brand
        const products = await ProdUsed.find({ "brand_name": brand })
        if (products.length !== 0) {
            return res.status(200).send(products)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

const productsUsedByGender = async function(req, res) {
    try {
        const gender = req.body.gender
        const products = await ProdUsed.find({ "gender": gender })
        if (products.length !== 0) {
            return res.status(200).send(products)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

const productsUsedByCategory = async function(req, res) {
    try {
        const category = req.body.category
        const products = await ProdUsed.find({ "category": category })
        if (products.length !== 0) {
            return res.status(200).send(products)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

const productUsedById = async function(req, res) {
    try {
        const idReq = req.body.id
        const product = await ProdUsed.findById(idReq)
        if (product) {
            return res.status(200).send(product)
        } else {
            return res.status(404).json({ "message": "Producto no encontrado" })
        }
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

const productUsedByName = async function(req, res) {
    try {
        const queryName = req.body.query
        const products = await ProdUsed.find({ "name": { "$regex": queryName, "$options": "i" } })
        if (products.length !== 0) {
            return res.status(200).send(products)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "error" })
    }
}

const productsUsedBySize = async function(req, res) {
    try {
        const size = req.body.size
        const products = await ProdUsed.find({ "size": size })
        if (products.length !== 0) {
            return res.status(200).send(products)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

const productsUsedByColor = async function(req, res) {
    try {
        const color = req.body.color
        const products = await ProdUsed.find({ "color": color })
        if (products.length !== 0) {
            return res.status(200).send(products)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

const productsUsedByPrice = async function(req, res) {
    try {
        const min = req.body.minPrice
        const max = req.body.maxPrice
        const products = await ProdUsed.find({ "price": { $gte: min, $lte: max } })
        if (products.length !== 0) {
            return res.status(200).send(products)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}



module.exports = {
    productsUsedCreate,
    getProductsUsed,
    productsUsedByGender,
    productsUsedByCategory,
    productUsedById,
    productUsedByName,
    productsUsedBySize,
    productsUsedByColor,
    productsUsedByBrand,
    productsUsedByPrice
};