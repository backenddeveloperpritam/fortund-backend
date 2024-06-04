import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        code: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
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
    { timestamps: true, collection: 'Country' }
);

countrySchema.pre('save', function (next) {
    if (this.isNew || this.isModified('title')) {
        this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
    }
    next();
});

countrySchema.pre('findOneAndUpdate', function (next) {
    if (this._update.title) {
        this._update.title = this._update.title.charAt(0).toUpperCase() + this._update.title.slice(1);
    }
    next();
});

countrySchema.pre('save', function (next) {
    if (this.isModified('code')) {
        this.code = this.code.toUpperCase();
    }
    next();
});

countrySchema.pre('findOneAndUpdate', function (next) {
    if (this._update.code) {
        this._update.code = this._update.code.toUpperCase();
    }
    next();
});

// const filterDeleted = function (next) {
//     this.where({ isDeleted: false });
//     next();
// };

// countrySchema.pre('find', filterDeleted);
// countrySchema.pre('findOne', filterDeleted);
// countrySchema.pre('findOneAndUpdate', filterDeleted);
// countrySchema.pre('findById', filterDeleted);

const Country = mongoose.model('Country', countrySchema);

export default Country;
