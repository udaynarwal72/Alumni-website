import { Router } from 'express';
import { Adminsignin, Adminsignup } from '../controllers/Admin/AdminController.js';
const AdminRoutes = Router();

AdminRoutes.post('/adminsignin',Adminsignin)
AdminRoutes.post('/adminsignup',Adminsignup)
AdminRoutes.delete('/:adminId',)
AdminRoutes.get('/:adminId',)
AdminRoutes.get('/:adminId/notifications',)
AdminRoutes.get('/:adminId/notifications/:notificationId',)
AdminRoutes.delete('/:adminId/notifications/:notificationId',)
AdminRoutes.get('/:adminId/settings',)
AdminRoutes.put('/:adminId/settings/change-password',)
AdminRoutes.put('/:adminId/settings/change-email',)
AdminRoutes.delete('/:adminId/delete',)



export default AdminRoutes;