import { Router } from 'express';
import verifyJWT from '../middlewares/Auth.middleware.js';
import { createAnnouncement, deleteAnnouncement, getAnnouncement, getAnnouncements, updateAnnouncement } from '../controllers/Announcement/AnnouncementController.js';

const AnnouncementRoutes = Router();

AnnouncementRoutes.post('/createannouncement', verifyJWT, createAnnouncement);
AnnouncementRoutes.get('/getannouncements', getAnnouncements);
AnnouncementRoutes.get('/getannouncement/:id', getAnnouncement);
AnnouncementRoutes.put('/updateannouncement/:id', verifyJWT, updateAnnouncement);
AnnouncementRoutes.delete('/deleteannouncement/:id', verifyJWT, deleteAnnouncement);

export default AnnouncementRoutes;
