import express from 'express';
import { usersController } from './users.controller';

const router = express.Router()
router.post('/POST/api/user', usersController.createUser)
router.get('/GET/api/user', usersController.getUsers)


export const UserRoutes = router