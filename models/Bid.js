const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BidSchema = new mongoose.Schema({
    tenderNumber: {
        type: String,
        required: true,
    },
    tenderTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tenderClosingTime: {
        type: Date,
        required: true,
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manager",
    },
    manager: {
        type: String,
        required: true,
    },
    bidder: {
        type: String
    },
    bidAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "PENDING",
    },
}, { usePushEach: true });
module.exports = mongoose.model("Bid", BidSchema);