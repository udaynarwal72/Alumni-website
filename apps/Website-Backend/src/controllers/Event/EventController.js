import Event from '../../Schema/EventSchema.js'; // Adjust the path as necessary
import uploadOnCloudinary from '../../utils/Cloudinary.js'; // Adjust the path as necessary
import ApiResponse from '../../utils/ApiResponse.js'; // Adjust the path as necessary
import ApiError from '../../utils/ApiError.js';
import ConfirmAppearance from '../../Schema/ConfirmAppearanceSchema.js'

const createEvent = async (req, res) => {
    try {
        const {
            event_title,
            event_date,
            event_start_time,
            event_end_time,
            event_venue,
            event_organizer,
            event_body,
            venue_address,
            venue_map_link,
            event_hashtags,
            live_stream_link,
            confirm_apperance_deadline
        } = req.body;

        const calculated_hash_tags = event_hashtags.split("#").filter(tag => tag.trim() !== '');

        const createdEvent = await Event.create({
            event_title,
            event_date,
            start_time: event_start_time,
            end_time: event_end_time,
            event_venue,
            venue_address,
            venue_map_link,
            event_body,
            event_organizer,
            confirm_apperance_deadline,
            event_hashtags: calculated_hash_tags,
            live_stream_link,
            posted_by: req.user._id
        });
        return res.status(200).json({
            status: 200,
            data: createdEvent,
            message: "Event created successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            data: null,
            message: `Error creating event: ${error.message}`
        });
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

const getEventById = async (req, res) => {
    try {
        const { eventId } = req.params;
        const events = await Event.findById(eventId).populate('coming_alumni' ,'first_name last_name');
        return res.status(200).json(new ApiResponse(200, events, "Event Fetched Succesfully"));
    } catch (error) {
        return req.status(500).json(new ApiError(500, error.message, "Internal Server Error"))
    }
}

//confirmApperance
const confirmedAppearance = async (req, res) => {
    try {
        console.log("Request Params:", req.params);
        const userId = req.user?._id;
        console.log("User ID:", userId);
        const eventId = req.params.eventId;

        if (!userId || !eventId) {
            return res
                .status(400)
                .json(new ApiError(400, null, "User ID or Event ID is missing"));
        }

        const appearanceConfirmed = await ConfirmAppearance.create({
            coming_user_id: userId,
            event_id: eventId,
        });

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { $addToSet: { coming_alumni: userId } }, // Assuming coming_alumni is an array
            { new: true }
        );

        if (!updatedEvent) {
            return res
                .status(404)
                .json(new ApiError(404, null, "Event not found"));
        }

        console.log("Updated Event:", updatedEvent);

        return res
            .status(200)
            .json(new ApiResponse(200, appearanceConfirmed, "Your appearance is confirmed"));
    } catch (error) {
        console.error(`Error confirming appearance: ${error.message}`);
        return res
            .status(500)
            .json(new ApiError(500, null, `Error confirming appearance: ${error.message}`));
    }
};



export {
    createEvent,
    getAllEvents,
    getEventById,
    updateEventById,
    deleteEventById,
    searchEventByname,
    searchEventByType,
    searchEventByDate,
    confirmedAppearance
};
