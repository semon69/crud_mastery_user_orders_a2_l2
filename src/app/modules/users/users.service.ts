import { Users } from "../users.model"
import { TUsers } from "./users.interface"

const createUsersIntoDb = async (users: TUsers) => {
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


export const usersService = {
    createUsersIntoDb,
    getAllUsersFromDb,
    getSingleUserFromDb,
    updateUsersDataFromDb

}