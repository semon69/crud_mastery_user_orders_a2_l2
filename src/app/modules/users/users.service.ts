import { Users } from "../users.model"
import { TOrder, TUsers } from "./users.interface"

const createUsersIntoDb = async (users: TUsers) => {
    if (await Users.isUserExists(users.userId)) {
        throw new Error('User already exists')
    }
    const result = await Users.create(users)
    return result
}
const getAllUsersFromDb = async () => {
    const result = await Users.aggregate([
        {
            $project: { _id: 0, userName: 1, fullName: 1, age: 1, email: 1, address: 1 }
        }
    ])
    return result
}

const getSingleUserFromDb = async (userId: number) => {
    const result = await Users.aggregate([
        {
            $match: { userId: userId }
        },
        {
            $project: { _id: 0, userName: 1, fullName: 1, age: 1, email: 1, address: 1, orders: 0 }
        }
    ])
    return result
}

const updateUsersDataFromDb = async (userId: number, user: TUsers) => {
    const result = await Users.updateOne(
        { userId: userId },
        {
            $set: user
        }
    )
    return result
}
const updateOrderDataFromDb = async (userId: number, order: TOrder) => {
    const user = await Users.findOne({ userId: userId })
    // if (await Users.isUserExists(userId)) {
    //     // throw new Error('User already exists')

    // }
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
}




export const usersService = {
    createUsersIntoDb,
    getAllUsersFromDb,
    getSingleUserFromDb,
    updateUsersDataFromDb,
    updateOrderDataFromDb

}