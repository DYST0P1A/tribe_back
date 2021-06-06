const mongoose = require('mongoose');
const Cat = mongoose.model('Category');

const categoriesCreate = async function(req, res) {
    try {
        if (req.user.type !== "admin") {
            return res.status(403).send({ "message": "No posees permisos para esta accion" })
        }

        const category = await new Cat(req.body)

        await category.save(async function(err) {
            if (err) {
                return res.status(500).send(err)
            }
        });

        return res.status(200).send('Success');
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

const getCategories = async function(req, res) {
    try {
        const categories = await Cat.find({})
        if (categories.length !== 0) {
            return res.status(200).send(categories)
        } else {
            return res.status(200).json([])
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "error" })
    }
}

module.exports = {
    getCategories,
    categoriesCreate
};