import { Router } from 'express';
import { Admindelete, Adminsignin, Adminsignup, addImageToHeroSection, allowUserByAdmin, deleteBlogByAdmin, deleteEventByAdmin, deleteJobByAdmin, deleteUserProfileByAdmin, getAllImageOfHeroSection, pushUserToWaitingRoomByAdmin, removeImageFromHeroSection } from '../controllers/Admin/AdminController.js';
import verifyAdmin from '../middlewares/Admin.middleware.js';
import { deleteAnnouncement } from '../controllers/Announcement/AnnouncementController.js';
import { upload } from '../middlewares/Multer.middleware.js';

const AdminRoutes = Router();

//Admin Routes
AdminRoutes.post('/adminsignin', Adminsignin)
AdminRoutes.post('/adminsignup', Adminsignup)
AdminRoutes.delete('/delete/:adminId', Admindelete)

//Admin Control on User
AdminRoutes.put('/allowuser/:userId', verifyAdmin, allowUserByAdmin);
AdminRoutes.put('/pushtowaitingroom/:userId', verifyAdmin, pushUserToWaitingRoomByAdmin);
AdminRoutes.delete('/deleteuser/:userId', verifyAdmin, deleteUserProfileByAdmin)
//Admin control on Blog
AdminRoutes.delete('/deleteblog/:blogId', verifyAdmin, deleteBlogByAdmin);
//Admin control on Event
AdminRoutes.delete('/deleteevent/:eventId', verifyAdmin, deleteEventByAdmin);
//Admin control on Job
AdminRoutes.delete('/deletejob/:jobId', verifyAdmin, deleteJobByAdmin);

//Admin control on Announcement
AdminRoutes.delete('/deleteannouncement/:id', verifyAdmin, deleteAnnouncement);

//Admin control on Herosection and adding Image into it
AdminRoutes.post('/addphotoinherosection',verifyAdmin, upload.fields([
    { name: 'coverImage', maxCount: 1 }
]), addImageToHeroSection);
AdminRoutes.delete('/adminremoveimage/:id', verifyAdmin, removeImageFromHeroSection);
AdminRoutes.get('/getallimage',getAllImageOfHeroSection)


export default AdminRoutes;