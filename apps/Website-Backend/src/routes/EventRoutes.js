import { Router } from "express";
import {
    createEvent,
    getAllEvents,
    updateEventById,
    deleteEventById,
    searchEventByname,
    searchEventByType,
    searchEventByDate
} from '../controllers/Event/EventController'; // Adjust the path as necessary

const EventRoutes = Router();

// Define routes and attach controller functions
EventRoutes.post('/events', upload.fields([{ name: 'promotional_image', maxCount: 1 }]), createEvent);
EventRoutes.get('/events', getAllEvents);
EventRoutes.put('/events/:eventId', upload.fields([{ name: 'promotional_image', maxCount: 1 }]), updateEventById);
EventRoutes.delete('/events/:eventId', deleteEventById);
EventRoutes.get('/events/search/name', searchEventByname);
EventRoutes.get('/events/search/type', searchEventByType);
EventRoutes.get('/events/search/date', searchEventByDate);

export default EventRoutes;
