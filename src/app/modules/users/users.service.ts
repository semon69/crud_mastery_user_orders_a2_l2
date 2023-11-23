import { Users } from "../users.model"
import { TOrder, TUsers } from "./users.interface"

const createUsersIntoDb = async (users: TUsers, userId: number) => {
    if (await Users.isUserExists(users.userId)) {
        throw new Error('User already exists')
    }
    await Users.create(users)
    const resultWithOutPass = await Users.aggregate([
        {
            $match: { userId: userId }
        },
        {
            $project: { _id: 0, userName: 1, fullName: 1, age: 1, email: 1, address: 1 }
        }
    ])
    return resultWithOutPass
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

const updateUsersDataFromDb = async (userId: number, user: TUsers) => {
    if (await Users.isUserExists(userId)) {
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

const deleteSingleUserFromDb = async (userId: number) => {
    if (await Users.isUserExists(userId)) {
        const result = await Users.deleteOne({ userId: userId })
        return result
    } else {
        throw new Error('User not found')
    }
}

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

const getTotalPriceForAOrdersFromDb = async (userId: number) => {
    if (await Users.isUserExists(userId)) {
        const user = await Users.findOne({ userId: userId })
        let totalCost = 0
        user?.orders?.forEach((order) => {
            const singleProductPrice = order?.price * order?.quantity
            totalCost += singleProductPrice
        })
        return totalCost
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