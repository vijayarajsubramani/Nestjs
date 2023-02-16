import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String
    },
    avatar: {
        type: String,
        default: 'https://api.multiavatar.com/ng.svg'
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)
