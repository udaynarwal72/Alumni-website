import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const ConfirmAppearanceSchema = new Schema({
    coming_user_id: { type: Schema.Types.ObjectId, ref: 'AlumniUser', required: true },
    event_id: { type: Schema.Types.ObjectId, ref: 'Event', required: true }
}, { timestamps: true });

const ConfirmAppearance = model('ConfirmAppearance', ConfirmAppearanceSchema);

export default ConfirmAppearance;
