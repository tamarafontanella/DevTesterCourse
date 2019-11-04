const mongoose = require('mongoose');
const config = require('./db.conf');

const mongoSrtConn = 'mongodb://localhost:3001/meteor'

mongoose.connect(mongoSrtConn)

const UserSchema = new mongoose.Schema({
    _id: String,
    profile: {
        name: String,
        email: String
    }
})

const User = mongoose.model('users', UserSchema)

module.exports = {
    deleteByEmail: email => User.deleteMany({'emails.address': email})
}