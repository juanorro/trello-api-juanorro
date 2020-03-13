const mongoose = require('mongoose');

const Card = require('../models/card.model');

const columsSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    position: {
        type: Number, 
        required: true, 
        unique: true
    }
}, {
    timestamps: true, 
    toJSON: {
        virtuals: true, 
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id; 
            delete ret._v;
            return ret; 
        }
    }
});

columsSchema.virtual('cards', {
    ref: Card.modelName,
    localField: '_id',
    foreignField: 'colum',
    options: { sort: { position: -1 } }
})

const Colum = mongoose.model('Column', columnSchema);

module.exports = Colums; 