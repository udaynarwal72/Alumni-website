const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    venue: { type: String, required: true },
    venue_address: { type: String },
    venue_city: { type: String },
    venue_state: { type: String },
    venue_country: { type: String },
    venue_zip_code: { type: String },
    venue_map_link: { type: String },
    coming_alumni: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    description: { type: String, required: true },
    organizer: { type: String, required: true },
    event_type: { type: String, enum: ['conference', 'webinar', 'meetup', 'workshop', 'other'], default: 'other' },
    confirm_apprrance: { type: String, require: false },
    max_attendees: { type: Number },
    promotional_image: { type: String },
    hashtags: [{ type: String }],
    live_stream_link: { type: String },
    feedback_form_link: { type: String },
    access_control: { type: String, enum: ['public', 'private', 'invite-only'], default: 'public' },
    contacts: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
