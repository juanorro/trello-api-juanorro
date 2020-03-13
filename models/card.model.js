const mongoose = require('mongoose');

const LABELS = ['Learning Unit', 'Lab', 'Example', 'Extra', 'Kata'];

const cardsSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
        maxlength: 10
    },
    descripcion: String,
    position: {
        type: Number, 
        required: true
    },
    imageURL: String, 
    label: {
        type: String, 
        enum: LABELS
    },
    columns: {
        type: mongoose.Types.ObjectId, 
        ref: 'Colum', 
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id; 
            delete ret._id; 
            delete ret._v; 
            return ret; 
        }
    }
});

cardsSchema.index({ position: 1, columns: 1 }, { unique: true });

const Card = mongoose.model('Card', cardsSchema);

module.exports = Card; 