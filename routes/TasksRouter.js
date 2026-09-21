import express from 'express';
import verifyJWT from '../middleware/VerifyJWT.js';
import { CreateTask, DeleteTask, EditTasks, GetTasks, GetTask } from '../controllers/TasksController.js'
import { verifyTasksFields } from '../middleware/VerifyFields.js';
import CheckTaskOwner from '../middleware/CheckTaskOwner.js';

const router = express.Router();

router.route('/')
    .get(verifyJWT, GetTasks)
    .post(verifyJWT, verifyTasksFields, CreateTask);

router.route('/:id')
    .get(verifyJWT, CheckTaskOwner, GetTask)
    .put(verifyJWT, verifyTasksFields, CheckTaskOwner, EditTasks)
    .delete(verifyJWT, CheckTaskOwner, DeleteTask);

export default router;