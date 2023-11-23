import express from 'express';
import { usersController } from './users.controller';

const router = express.Router()

router.post('/', usersController.createUser)
router.get('/', usersController.getUsers)
router.get('/:userId', usersController.getSingleUser)
router.delete('/:userId', usersController.deleteSingleUser)
router.put('/:userId', usersController.updateSingleUser)
router.put('/:userId/orders', usersController.addOrderData)
router.get('/:userId/orders', usersController.getAllOrderFromAUser)
router.get('/:userId/orders/total-price', usersController.getTotalPriceFromOrder)


export const UserRoutes = router