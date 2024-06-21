import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const eventSchema = new Schema({
    event_title: { type: String, required: true },
    event_date: { type: Date, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    event_venue: { type: String, required: true },
    venue_address: { type: String },
    venue_map_link: { type: String },
    coming_alumni: [{ type: Schema.Types.ObjectId, ref: 'Alumni' }],
    event_body: { type: String },
    event_organizer: { type: String},
    event_hashtags: [{ type: String }],
    confirm_apperance_deadline: { type: Date },
    live_stream_link: { type: String },
    feedback_form_link: { type: String },
}, { timestamps: true });

const Event = model('Event', eventSchema);

export default Event;












    // venue_city: { type: String },
    // venue_state: { type: String },
    // venue_country: { type: String },
    // venue_zip_code: { type: String },
    // event_type: { type: String, enum: ['conference', 'webinar', 'meetup', 'workshop', 'other'], default: 'other' },
    // promotional_image: { type: String },

