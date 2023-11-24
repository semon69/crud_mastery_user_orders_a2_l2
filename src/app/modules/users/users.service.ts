
import config from "../../config"
import { Users } from "../users.model"
import { TOrder, TUsers } from "./users.interface"
import bcrypt from "bcrypt"

// Function for create user into db. Check user already exist or not
const createUsersIntoDb = async (users: TUsers, userId: number) => {
    if (await Users.isUserExists(users.userId)) {
        throw new Error('User already exists')
    }
    await Users.create(users)
    const result = await Users.aggregate([
        {
            $match: { userId: userId }
        },
        {
            $project: { _id: 0, userId: 1, userName: 1, fullName: 1, age: 1, email: 1, address: 1 }
        }
    ])
    return result[0]
}

// Function for get all users from db
const getAllUsersFromDb = async () => {
    const result = await Users.aggregate([
        {
            $project: { _id: 0, userName: 1, fullName: 1, age: 1, email: 1, address: 1 }
        }
    ])
    return result
}

// Function for get a user from db. Check user exist or not
const getSingleUserFromDb = async (userId: number) => {
    if (await Users.isUserExists(userId)) {
        const result = await Users.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $project: { _id: 0, userId: 1, userName: 1, fullName: 1, age: 1, isActive: 1, email: 1, hobbies: 1, address: 1 }
            }
        ])
        return result[0]
    } else {
        throw new Error('User not found')
    }


}

// Function for update a user from db. Check user exist or not
const updateUsersDataFromDb = async (userId: number, user: TUsers) => {
    if (await Users.isUserExists(userId)) {
        user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
        await Users.updateOne(
            { userId: userId },
            {
                $set: user
            }
        )
        const result = await Users.aggregate([
            {
                $match: { userId: user?.userId }
            },
            {
                $project: { _id: 0, userId: 1, userName: 1, fullName: 1, age: 1, isActive: 1, email: 1, hobbies: 1, address: 1 }
            }
        ])
        return result
    } else {
        throw new Error('User not found')
    }
}

// Function for delete a user from db. Check user exist or not
const deleteSingleUserFromDb = async (userId: number) => {
    if (await Users.isUserExists(userId)) {
        const result = await Users.deleteOne({ userId: userId })
        return result
    } else {
        throw new Error('User not found')
    }
}

// Function for update a user orders from db. Check user exist or not. If there  is orders previously then push new order else set new order
const addOrderDataIntoDb = async (userId: number, order: TOrder) => {
    if (await Users.isUserExists(userId)) {
        const user = await Users.findOne({ userId: userId })
        if (user?.orders && Array.isArray(user.orders)) {
            await Users.updateOne(
                { userId },
                { $push: { orders: order } }
            );
        } else {
            await Users.updateOne(
                { userId },
                { $set: { orders: [order] } }
            );
        }

    } else {
        throw new Error('User not found')
    }

}

// Function for get a user orders data from db. Check user exist or not
const getAllOrdersForSingleUserFromDb = async (userId: number) => {
    if (await Users.isUserExists(userId)) {
        const result = await Users.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $project: { _id: 0, orders: 1 }
            }
        ])
        return result[0]
    } else {
        throw new Error('User not found')
    }

}

// Function for get a user orders total price from db. Check user exist or not
const getTotalPriceForAOrdersFromDb = async (userId: number) => {
    if (await Users.isUserExists(userId)) {
        const result = await Users.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $unwind: "$orders"
            },
            {
                $group: {
                    _id: null,
                    totalPrice: {
                        $sum: {
                            $multiply: ["$orders.price", "$orders.quantity"]
                        }
                    }

                }
            },
            {
                $project: { _id: 0, totalPrice: 1 }
            }
        ])
        return result[0]
    } else {
        throw new Error('User not found')
    }
}

export const usersService = {
    createUsersIntoDb,
    getAllUsersFromDb,
    getSingleUserFromDb,
    deleteSingleUserFromDb,
    updateUsersDataFromDb,
    addOrderDataIntoDb,
    getAllOrdersForSingleUserFromDb,
    getTotalPriceForAOrdersFromDb

}