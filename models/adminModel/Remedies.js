import mongoose from 'mongoose';

const remediesSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ['Active', 'InActive'],
        default: 'Active'
    },
    isDeleted: {
        type: Number,
        default: 0,
    },
}, { collection: 'Remedies', timestamps: true });

remediesSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('title')) {
        this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
    }
    next();
});

const excludeDeletedRecords = function (next) {
    this.where({ isDeleted: { $ne: 1 } });
    next();
};

remediesSchema.pre('find', excludeDeletedRecords);
remediesSchema.pre('findOne', excludeDeletedRecords);
remediesSchema.pre('findOneAndUpdate', excludeDeletedRecords);
remediesSchema.pre('count', excludeDeletedRecords);
remediesSchema.pre('countDocuments', excludeDeletedRecords);

const Remedies = mongoose.model('Remedies', remediesSchema);

export default remediesSchema;
