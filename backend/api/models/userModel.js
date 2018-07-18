var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required!']
    },
    email: {
        type: String,
        required: [true, 'email is required!'],
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    type: {
        type: String,
        enum: ['customer', 'employee', 'admin'],
        default: 'customer'
    }
});

module.exports = mongoose.model('Users', userSchema);