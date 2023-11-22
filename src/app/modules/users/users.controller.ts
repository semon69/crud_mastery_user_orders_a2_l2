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
            error: error,
        });
    }
}

export const usersController = {
    createUser
}