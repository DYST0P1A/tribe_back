const mongoose = require('mongoose');
const Us = mongoose.model('User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const emailSender = require('../middleware/emailsender');
require('dotenv').config();


const usersCreate = async function(req, res) {
    try {
        const user = await new Us(req.body)

        let emailExists = req.body.email
        const userExists = await Us.findOne({ "email": emailExists })
        if (userExists !== null && userExists.status === "Pending") {
            await Us.find({ email: userExists.email }).deleteOne().exec();
        } else if (userExists !== null && userExists.status === "Active") {
            return res.status(409).json({ "message": "Ya existe una cuenta con ese correo" });
        }

        const emailCode = jwt.sign({ email: req.body.email }, process.env.EMAIL_KEY)
        const token = await user.generateAuthToken() // generamos un token de autenticación

        user.state = "Pending"
        user.confirmationCode = emailCode
        user.password = await bcrypt.hash(user.password, 8)
        user.tokens = await user.tokens.concat({ token })

        await user.save(async function(err) {
            if (err) {
                return res.status(500).send(err)
            }
            await emailSender.sendConfirmationEmail(user.name, user.email, emailCode);
        });

        return res.status(200).send('Success');
    } catch (error) {
        return res.status(500).send({ "message": "error" })
    }
}

const confirmAccount = async function(req, res) {
    try {
        let code = req.params.code
        Us.findOne({
                "confirmationCode": code,
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).send({ "message": "Usuario no encontrado" });
                }
                user.status = "Active";
                user.save((err) => {
                    if (err) {
                        return res.status(500).send({ "message": err });
                    } else {
                        return res.redirect('https://www.google.es');
                    }
                });
            })
    } catch (error) {
        res.status(500).send(error)
    }
}

const usersLogin = async function(req, res) {
    try {
        const { email, password } = req.body

        var user
        try {
            user = await Us.findByCredentials(email, password)
            if (user.status != "Active") {
                return res.status(400).send({ "message": 'Usuario pendiente de confirmación' })
            }
        } catch (err) {
            return res.status(400).send({ "message": 'Credenciales incorrectas' })
        }

        const token = await user.generateAuthToken()
        user.tokens = await user.tokens.concat({ token })
        await user.save(async function(err) {
            if (err) {
                return res.status(500).send(err)
            }
        });
        const name = user.name
        const lastname = user.lastname

        return res.status(200).send({ name, lastname, token })
    } catch (error) {
        res.status(500).send(error)
    }
}

const userMe = function(req, res) {
    res.send(req.user)
}

const changePassword = async function(req, res) {
    try {
        if (!req.user.email) {
            return res.status(400).json({ "message": "Usuario no especificado" });
        }

        try {
            const userVal = await Us.findByCredentials(req.user.email, req.body.oldpassword)
        } catch (err) {
            return res.status(400).json({ "message": "Credenciales incorrectas" });
        }

        const pass = await bcrypt.hash(req.body.password, 8)
        Us
            .findOne({ email: req.user.email })
            .exec((err, user) => {
                if (!user) {
                    return res.status(404).json({ "message": "Usuario no encontrado" });
                } else if (err) {
                    return res.status(400).json(err);
                }
                if (user.status === "Pending") {
                    return res.status(400).json({ "message": "Usuario pendiente de confirmación" })
                }
                user.password = pass
                user.save((err, user) => {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
                        return res.status(200).json({ "message": "success" });
                    }
                });
            });
    } catch (error) {
        res.status(500).send(error)
    }
}


module.exports = {
    usersCreate,
    confirmAccount,
    usersLogin,
    userMe,
    changePassword
};