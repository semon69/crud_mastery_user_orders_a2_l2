import { Request, Response } from "express";
import { usersService } from "./users.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body
        const result = await usersService.createUsersIntoDb(user)
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

export const usersController = {
    createUser,
    getUsers,
    getSingleUser,
    updateSingleUser

}