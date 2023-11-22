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
                error: res.status(500),
                description: error
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
                error: res.status(500),
                description: error
            }
        });
    }
}

export const usersController = {
    createUser,
    getUsers,
}