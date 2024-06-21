import { Router } from 'express';
import { getAllJobs, getJobById, postJob } from '../controllers/Job/JobController.js';
import verifyJWT from '../middlewares/Auth.middleware.js';

// Create a new Router instance
const Jobroutes = Router();

// Define a GET route for '/alljobs' that uses the getAllJobs controller
Jobroutes.get('/alljobs', getAllJobs);
Jobroutes.post('/postjob', verifyJWT, postJob);
Jobroutes.get('/getjob/:jobId',getJobById);
// Export the router as the default export
export default Jobroutes;
