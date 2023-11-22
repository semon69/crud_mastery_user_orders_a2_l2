import { Request, Response } from "express";
import { usersService } from "./users.service";
import UserSchemaZod from "./user.validation.zod";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body
        const zodValidationData = UserSchemaZod.parse(user)
        const result = await usersService.createUsersIntoDb(zodValidationData)
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 500,
                description: error.message || 'Something went wrong',
            }
        });
    }
}

const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await usersService.getAllUsersFromDb()
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 500,
                description: error.message || 'Something went wrong',
            }
        });
    }
}
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const idNumber = parseFloat(userId)
        const result = await usersService.getSingleUserFromDb(idNumber)
        res.status(200).json({
            success: true,
            message: 'A User data fetched successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 500,
                description: error.message || 'Something went wrong',
            }
        });
    }
}
const updateSingleUser = async (req: Request, res: Response) => {
    try {
        const user = req.body
        const { userId } = req.params
        const idNumber = parseFloat(userId)
        const result = await usersService.updateUsersDataFromDb(idNumber, user)

        res.status(200).json({
            success: true,
            message: 'User data updated successfully!',
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 500,
                description: error.message || 'Something went wrong',
            }
        });
    }
}
const updateOrderData = async (req: Request, res: Response) => {
    try {
        const order = req.body
        const { userId } = req.params
        const idNumber = parseFloat(userId)
        await usersService.updateOrderDataFromDb(idNumber, order)

        res.status(200).json({
            success: true,
            message: 'Order data updated successfully!',
            data: null,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 500,
                description: error.message || 'Something went wrong',
            }
        });
    }
}

const getAllOrderFromAUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const idNumber = parseFloat(userId)
        const result = await usersService.getAllOrdersForSingleUserFromDb(idNumber)
        res.status(200).json({
            success: true,
            message: 'Get single Order data successfully!',
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 500,
                description: error.message || 'Something went wrong',
            }
        });
    }
}
const getTotalPriceFromOrder = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const idNumber = parseFloat(userId)
        const result = await usersService.getTotalPriceForAOrdersFromDb(idNumber)
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: {
                code: 500,
                description: error.message || 'Something went wrong',
            }
        });
    }
}

export const usersController = {
    createUser,
    getUsers,
    getSingleUser,
    updateSingleUser,
    updateOrderData,
    getAllOrderFromAUser,
    getTotalPriceFromOrder

}