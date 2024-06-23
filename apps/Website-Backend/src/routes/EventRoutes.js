import { Router } from "express";
import {
    createEvent,
    getAllEvents,
    updateEventById,
    deleteEventById,
    searchEventByname,
    searchEventByType,
    searchEventByDate,
    getEventById,
    confirmedAppearance
} from '../controllers/Event/EventController.js'; // Adjust the path as necessary
import { upload } from '../middlewares/Multer.middleware.js';
import verifyJWT from "../middlewares/Auth.middleware.js";
const EventRoutes = Router();

// Define routes and attach controller functions
EventRoutes.post('/postevent', verifyJWT, createEvent);
EventRoutes.get('/getallevents', getAllEvents);
EventRoutes.put('/events/:eventId', verifyJWT, upload.fields([{ name: 'promotional_image', maxCount: 1 }]), updateEventById);
EventRoutes.delete('/events/:eventId', verifyJWT, deleteEventById);
EventRoutes.get('/findeventbyid/:eventId', getEventById)

//confirm apperance 
EventRoutes.post('/confirmappearance/:eventId', verifyJWT, confirmedAppearance);
export default EventRoutes;
