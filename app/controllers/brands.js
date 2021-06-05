const mongoose = require('mongoose');
const Brand = mongoose.model('Brand');


const brandsCreate = async function(req, res) {
    try {
        if (req.user.type !== "admin") {
            return res.status(403).send({ "message": "No posees permisos para esta accion" })
        }

        const brand = await new Brand(req.body)

        await brand.save(async function(err) {
            if (err) {
                return res.status(500).send(err)
            }
        });

        return res.status(200).send('Success');
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}


const brandByName = async function(req, res) {
    try {
        const queryName = req.body.query
        const brands = await Brand.find({ "name": { "$regex": queryName, "$options": "i" } })
        if (brands.length !== 0) {
            return res.status(200).send(brands)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "error" })
    }
}

const getBrands = async function(req, res) {
    try {
        const brands = await Brand.find({})
        if (brands.length !== 0) {
            return res.status(200).send(brands)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "error" })
    }
}

module.exports = {
    brandsCreate,
    brandByName,
    getBrands
};