const mongoose = require("mongoose")
const Schema = mongoose.Schema

const eventsSchema = new Schema({
    title: {
        type: String,
        min: 3,
        max: 255,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    event_start: {
        type: Date,
        default: Date.now
    },
    event_end: {
        type: Date,
        default: Date.now
    },
})

const Event = mongoose.model('events', eventsSchema);

module.exports = Event