import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const AstrologerLoginLogSchema = new mongoose.Schema({
    astrologerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Astrologer',
        required: true
    },
    loginTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    logoutTime: {
        type: Date
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    }
});

AstrologerLoginLogSchema.plugin(mongoosePaginate);

const AstrologerLoginLog = mongoose.model("AstrologerLoginLog", AstrologerLoginLogSchema);

export default AstrologerLoginLog;
