import Event from './path_to_your_event_model'; // Adjust the path as necessary
import uploadOnCloudinary from './path_to_your_upload_function'; // Adjust the path as necessary
import ApiResponse from './path_to_your_api_response_class'; // Adjust the path as necessary
import ApiError from '../../utils/ApiError';

const createEvent = async (req, res) => {
    try {
        const {
            name, date, start_time, end_time, venue, venue_address, venue_city, venue_state,
            venue_country, venue_zip_code, venue_map_link, description, organizer,
            event_type, hashtags, live_stream_link, feedback_form_link,
        } = req.body;

        let promotionalImagePath = "";
        if (req.files && Array.isArray(req.files.promotional_image) && req.files.promotional_image.length > 0) {
            promotionalImagePath = req.files.promotional_image[0].path;
        }

        const uploadImageCloud = await uploadOnCloudinary(promotionalImagePath);
        const createdEvent = await Event.create({
            name: name,
            date: date,
            start_time: start_time,
            end_time: end_time,
            venue: venue,
            venue_address: venue_address,
            venue_city: venue_city,
            venue_state: venue_state,
            venue_country: venue_country,
            venue_zip_code: venue_zip_code,
            venue_map_link: venue_map_link,
            description: description,
            organizer: organizer,
            event_type: event_type,
            promotional_image: uploadImageCloud?.url || "",
            hashtags: hashtags,
            live_stream_link: live_stream_link,
            feedback_form_link: feedback_form_link,
        });

        return res.status(200).json(new ApiResponse(200, createdEvent, "Event created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error creating event: ${error.message}`));
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();

        return res.status(200).json(new ApiResponse(200, events, "Events retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, `Error retrieving events: ${error.message}`));
    }
}

const updateEventById = async (req, res) => {
    try {
        const { eventId } = req.params;
        const {
            name, date, start_time, end_time, venue, venue_address, venue_city, venue_state,
            venue_country, venue_zip_code, venue_map_link, description, organizer,
            event_type, hashtags, live_stream_link, feedback_form_link,
        } = req.body;

        let promotionalImagePath = "";
        if (req.files && Array.isArray(req.files.promotional_image) && req.files.promotional_image.length > 0) {
            promotionalImagePath = req.files.promotional_image[0].path;
        }

        const uploadImageCloud = await uploadOnCloudinary(promotionalImagePath);
        const updatedEvent = await Event.findByIdAndUpdate(eventId, {
            name: name,
            date: date,
            start_time: start_time,
            end_time: end_time,
            venue: venue,
            venue_address: venue_address,
            venue_city: venue_city,
            venue_state: venue_state,
            venue_country: venue_country,
            venue_zip_code: venue_zip_code,
            venue_map_link: venue_map_link,
            description: description,
            organizer: organizer,
            event_type: event_type,
            promotional_image: uploadImageCloud?.url || "",
            hashtags: hashtags,
            live_stream_link: live_stream_link,
            feedback_form_link: feedback_form_link,
        });

        return res.status(200).json(new ApiResponse(200, updatedEvent, "Event updated successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, null, `Error updating event: ${error.message}`));
    }
}

const deleteEventById = async (req, res) => {
    try {
        const { eventId } = req.params;
        await Event.findByIdAndDelete(eventId);

        return res.status(200).json(new ApiResponse(200, null, "Event deleted successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, null, `Error deleting event: ${error.message}`));
    }
}

const searchEventByname = async (req, res) => {
    try {
        const { name } = req.query;
        const events = await Event.find({ name: { $regex: name, $options: 'i' } });

        return res.status(200).json(new ApiResponse(200, events, "Events retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, null, `Error retrieving events: ${error.message}`));
    }
}

const searchEventByType = async (req, res) => {
    try {
        const { event_type } = req.query;
        const events = await Event.find({ event_type: event_type });

        return res.status(200).json(new ApiResponse(200, events, "Events retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, null, `Error retrieving events: ${error.message}`));
    }
}

const searchEventByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const events = await Event.find({
            date: {
                $gte: new Date(date),
                $lt: new Date(date + 'T23:59:59.999Z')
            }
        });
        res.status(200).json(new ApiResponse(200, events, "Events retrieved successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiError(500, null, `Error retrieving events: ${error.message}`));
    }
}

export {
    createEvent,
    getAllEvents,
    updateEventById,
    deleteEventById,
    searchEventByname,
    searchEventByType,
    searchEventByDate
};
