import mongoose from 'mongoose';

const citySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'State',
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
    { timestamps: true, collection: 'City' }
);


citySchema.pre('save', function (next) {
    if (this.isNew || this.isModified('title')) {
        this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
    }
    next();
});

citySchema.pre('findOneAndUpdate', function (next) {
    if (this._update.title) {
        this._update.title = this._update.title.charAt(0).toUpperCase() + this._update.title.slice(1);
    }
    next();
});
// Pre-hook for all find queries to filter out deleted documents
const filterDeleted = function (next) {
    this.where({ isDeleted: false });
    next();
};

citySchema.pre('find', filterDeleted);
citySchema.pre('findOne', filterDeleted);
citySchema.pre('findOneAndUpdate', filterDeleted);
citySchema.pre('findById', filterDeleted);

const City = mongoose.model('City', citySchema);

export default City;
