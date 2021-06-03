const mongoose = require('mongoose');
const Brand = mongoose.model('Brand');


const brandsCreate = async function(req, res) {
    try {
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

module.exports = {
    brandsCreate
};