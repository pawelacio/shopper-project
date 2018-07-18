var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var basketSchema = new Schema({
    buyer: { type: Schema.Types.ObjectId, ref: 'Users'},
    totalCost: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
    paymentDate: Date,
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'Products' }]
});

module.exports = mongoose.model('Baskets', basketSchema);