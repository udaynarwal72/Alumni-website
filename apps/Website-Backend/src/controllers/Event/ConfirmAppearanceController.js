import ConfirmAppearance from "../../Schema/ConfirmAppearanceSchema";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";

const ConfirmedAppearance = async (req, res) => {
    try {
        const userId = req.user?._id;
        const eventId = req.params.eventId;
        const appearanceConfirmed = await ConfirmAppearance.create({
            commer_user_id: userId,
            event_id: eventId,
        });
        return res
            .status(200)
            .json(new ApiResponse(200, appearanceConfirmed, "Your appearance is confirmed"));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(500, null, `Error confirming appearance: ${error.message}`));
    }
}

const removeYourAppearance = async (req, res) => {
    try {
        const userId = req.user?._id;
        const eventId = req.params.eventId;
        const appearance = await ConfirmAppearance.findOneAndDelete({ commer_user_id: userId, event_id: eventId });
        if (!appearance) {
            return res.status(404).json(new ApiResponse(404, null, "Appearance not found"));
        }
        return res.status(200).json(new ApiResponse(200, appearance, "Your appearance is removed"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, null, `Error removing appearance: ${error.message}`));
    }
}

const getAllConfirmedAppearances = async (req, res) => {
    try {
        const userId = req.user?._id;
        const confirmations = await ConfirmAppearance.find({ commer_user_id: userId }).populate('event_id');
        return res.status(200).json(new ApiResponse(200, confirmations, "Confirmed appearances retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, null, `Error retrieving confirmations: ${error.message}`));
    }
}

const getAllUsersConfirmedForEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const confirmations = await ConfirmAppearance.find({ event_id: eventId }).populate('commer_user_id');
        return res.status(200).json(new ApiResponse(200, confirmations, "Users confirmed for event retrieved successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, null, `Error retrieving users for event: ${error.message}`));
    }
}

export {
    ConfirmedAppearance,
    removeYourAppearance,
    getAllConfirmedAppearances,
    getAllUsersConfirmedForEvent
}
