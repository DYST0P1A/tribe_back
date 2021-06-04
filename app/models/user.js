const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const itemsSchema = new mongoose.Schema({
    id_item: {
        type: String,
        required: true
    },
    sizeSelected: {
        type: String,
        required: false,
        default: ""
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
})


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: false
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    telephone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: { 
        type: String, 
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
           type: String,
           required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: false,
        default: 0
    },
    cart: [itemsSchema],
    favorites: [{
        id_item: {
            type: String,
            required: false
        }
    }],
    wishlist: [{
        id_item: {
            type: String,
            required: false
        }
    }],
});

// Este método utiliza el JWT para firmar el método para crear un token. El método firmado espera los datos que se utilizarán para firmar el token y una clave JWT 
// que puede ser una cadena aleatoria. Para nuestro caso, definimos uno y lo llamamos JWT_KEY. Una vez creado el token, lo agregamos a la lista de tokens del usuario, 
// y devolvemos el token.
userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    return token
}

// espera dos parámetros, el correo electrónico del usuario y la contraseña. 
// buscamos un usuario con el correo electrónico proporcionado utilizando el método de búsqueda de mongoose. 
// Si el usuario no está disponible, arrojamos un error para informarle que las credenciales que proporcionó no son válidas. 
// Si el correo electrónico existe, comparamos la contraseña recibida con la contraseña almacenada y si coinciden, devolvemos ese usuario. 
userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email } )
    if (!user) {
       throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
       throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('User', userSchema)   

mongoose.model('User', userSchema);