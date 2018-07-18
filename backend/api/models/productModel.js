var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: { type: String, required: true},
    type: { type: String, required: true},
    amount: { type: Number, required: true, min: 0},
    price: { type: Number, required: true, min: 0},
    // discount: {
    //     value: { type: Number, min: 0, max: 100},
    //     end_date: Date
    // },
    availability: Boolean,
    description: String,
});

module.exports = mongoose.model('Products', productSchema);