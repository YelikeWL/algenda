const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Joi = require("joi")

const userSchema = new Schema({
    name: {
        type: String,
        min: 3,
        max: 255,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        min: 6,
        max: 255,
        required: true,
    },
    confirm_password: {
        type: String,
        min: 6,
        max: 255,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    verified: {
        type: Boolean,
        default: false,
    },
})

const User = mongoose.model('users', userSchema);

const validate = (User) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required().label('Name'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().min(6).max(255).required().label('Password'),
        confirm_password: Joi.any().equal(Joi.ref('password')).required()
            .label('Confirm Password')
            .messages({ 'any.only': '{{#label}} does not match' })
    })

    return schema.validate(User)
}

module.exports = {
    User,
    validate,
}