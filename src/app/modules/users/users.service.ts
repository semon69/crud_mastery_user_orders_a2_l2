import { Users } from "../users.model"
import { TUsers } from "./users.interface"

const createUsersIntoDb = async (users: TUsers) => {
    const result = await Users.create(users)

    return result
}


export const usersService = {
    createUsersIntoDb,

}