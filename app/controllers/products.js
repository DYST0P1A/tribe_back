const mongoose = require('mongoose');
const Prod = mongoose.model('Product');
const Brand = mongoose.model('Brand')


const productsCreate = async function(req, res) {
    try {
        if (req.user.type !== "admin") {
            return res.status(403).send({ "message": "No posees permisos para esta accion" })
        }

        const wear = await new Prod(req.body)

        await wear.save(async function(err) {
            if (err) {
                return res.status(500).send(err)
            }
        });

        const brand = await Brand.findById(wear.brand_id)
        if (brand) {
            const id_product = wear._id
            brand.id_products = await brand.id_products.concat({ id_product })
            await brand.save(async function(err) {
                if (err) {
                    return res.status(500).send(err)
                }
            });
        } else {
            return res.status(404).json({ "message": "Marca no encontrada" })
        }

        return res.status(200).send('Success');
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "error" })
    }
}

const getProducts = async function(req, res) {
    try {
        const products = await Prod.find({})
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

const productsByBrand = async function(req, res) {
    try {
        const brand = req.body.brand
        const products = await Prod.find({ "brand_name": brand })
        if (products.length !== 0) {
            return res.status(200).send(products)
        } else {
            return res.status(200).json([])
        }
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
        console.log(req.body.id)
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

const productByName = async function(req, res) {
    try {
        const queryName = req.body.query
        const products = await Prod.find({ "name": { "$regex": queryName, "$options": "i" } })
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

const productsBySize = async function(req, res) {
    try {
        const size = req.body.size
        const products = await Prod.find({ "sizes.size": size })
        if (products.length !== 0) {
            return res.status(200).send(products)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

const productsByColor = async function(req, res) {
    try {
        const color = req.body.color
        const products = await Prod.find({ "color": color })
        if (products.length !== 0) {
            return res.status(200).send(products)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

const productsByPrice = async function(req, res) {
    try {
        const min = req.body.minPrice
        const max = req.body.maxPrice
        const products = await Prod.find({ "price": { $gte: min, $lte: max } })
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
    productsCreate,
    getProducts,
    productsByGender,
    productsByCategory,
    productById,
    productByName,
    productsBySize,
    productsByColor,
    productsByBrand,
    productsByPrice
};