import { Router } from 'express';
import { Admindelete, Adminsignin, Adminsignup, allowUserByAdmin, deleteBlogByAdmin, deleteEventByAdmin, deleteJobByAdmin, deleteUserProfileByAdmin, pushUserToWaitingRoomByAdmin } from '../controllers/Admin/AdminController.js';
import verifyAdmin from '../middlewares/Admin.middleware.js';
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

export default AdminRoutes;