import mongoose from 'mongoose';
import Country from './Country.js';

const stateSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        countryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country',
            required: true
        },
        status: {
            type: String,
            enum: ["Active", "InActive"],
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true, collection: 'State' }
);


stateSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('title')) {
        this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
    }
    next();
});

stateSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.title) {
        this._update.title = this._update.title.charAt(0).toUpperCase() + this._update.title.slice(1);
    }
    next();
});

const filterDeleted = function (next) {
    this.where({ isDeleted: false });
    next();
};


// stateSchema.pre('find', filterDeleted);
// stateSchema.pre('findOne', filterDeleted);
// stateSchema.pre('findOneAndUpdate', filterDeleted);
// stateSchema.pre('findById', filterDeleted);

const State = mongoose.model('State', stateSchema);

export default State;
