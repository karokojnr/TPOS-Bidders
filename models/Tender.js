const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TenderSchema = new mongoose.Schema({
    tenderNumber: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    tendercover: {
        type: String,
        default:
            "https://www.flaticon.com/svg/static/icons/svg/1702/1702843.svg",
    },
    description: {
        type: String,
        required: true,
    },
    closingTime: {
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { usePushEach: true });
module.exports = mongoose.model("Tender", TenderSchema);