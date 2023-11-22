import express from 'express';
import { usersController } from './users.controller';

const router = express.Router()

router.post('/POST/api/users', usersController.createUser)
router.get('/GET/api/users', usersController.getUsers)
router.get('/GET/api/users/:userId', usersController.getSingleUser)
router.put('/PUT/api/users/:userId', usersController.updateSingleUser)
router.put('/PUT/api/users/:userId/orders', usersController.updateOrderData)


export const UserRoutes = router