import { Router } from 'express';
import { Admindelete, Adminsignin, Adminsignup } from '../controllers/Admin/AdminController.js';
const AdminRoutes = Router();

AdminRoutes.post('/adminsignin',Adminsignin)
AdminRoutes.post('/adminsignup',Adminsignup)
AdminRoutes.delete('/delete/:adminId',Admindelete)
AdminRoutes.get('/:adminId',)

export default AdminRoutes;