import Announcement from "../../Schema/AnouncementSchema.js";

const createAnnouncement = async (req, res) => {
    const { title, body } = req.body;
    const announcement = new Announcement({
        title,
        body,
        createdBy: req.user._id,
        isPublished:true,
    });
    try {
        await announcement.save();
        res.status(201).json({ announcement,message: "Announcement created successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error creating announcement: " + error.message });
    }
}
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().populate('createdBy','username');
        res.status(200).json({ data: announcements });
    } catch (error) {
        res.status(400).json({ message: "Error fetching announcements: " + error.message });
    }
}

const getAnnouncement = async (req, res) => {
    const { id } = req.params;
    try {
        const announcement = await Announcement
            .findById(id)
            .populate('createdBy', 'username')
            .exec();
        if (!announcement) {
            throw new Error("Announcement not found");
        }
        res.status(200).json({ data: announcement });
    }
    catch (error) {
        res.status(400).json({ message: "Error fetching announcement: " + error.message });
    }
}

const updateAnnouncement = async (req, res) => {
    const { id } = req.params;
    const { title, description, date } = req.body;
    try {
        const announcement = await Announcement.findByIdAndUpdate(id, {
            title,
            description,
            date,
        }, { new: true });
        if (!announcement) {
            throw new Error("Announcement not found");
        }
        res.status(200).json({ message: "Announcement updated successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error updating announcement: " + error.message });
    }
}

const deleteAnnouncement = async (req, res) => {
    const { id } = req.params;
    try {
        const announcement = await Announcement.findByIdAndDelete(id);
        if (!announcement) {
            throw new Error("Announcement not found");
        }
        res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting announcement: " + error.message });
    }
}

export {
    createAnnouncement,
    getAnnouncements,
    getAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
};