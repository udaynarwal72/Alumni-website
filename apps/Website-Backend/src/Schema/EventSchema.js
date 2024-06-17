import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

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
    coming_alumni: [{ type: Schema.Types.ObjectId, ref: 'AlumniUser' }],
    description: { type: String, required: true },
    organizer: { type: String, required: true },
    event_type: { type: String, enum: ['conference', 'webinar', 'meetup', 'workshop', 'other'], default: 'other' },
    promotional_image: { type: String },
    hashtags: [{ type: String }],
    live_stream_link: { type: String },
    feedback_form_link: { type: String },
}, { timestamps: true });

const Event = model('Event', eventSchema);

export default Event;
