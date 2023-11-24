import express from 'express';
import { usersController } from './users.controller';

const router = express.Router()

router.post('/', usersController.createUser) // Create user route. Endpoint /api/users
router.get('/', usersController.getUsers)  // Get all users route. Endpoint /api/users
router.get('/:userId', usersController.getSingleUser) // Get a user route. Endpoint /api/users/:userId
router.delete('/:userId', usersController.deleteSingleUser) // Delete a user route. Endpoint /api/users/:userId
router.put('/:userId', usersController.updateSingleUser) // Update a user route. Endpoint /api/users/:userId
router.put('/:userId/orders', usersController.addOrderData) // Update user orders route. Endpoint /api/users/:userId/orders
router.get('/:userId/orders', usersController.getAllOrderFromAUser) // Get user orders route. Endpoint /api/users/:userId/orders
router.get('/:userId/orders/total-price', usersController.getTotalPriceFromOrder) // Update user orders route. Endpoint /api/users/:userId/orders/total-price


export const UserRoutes = router