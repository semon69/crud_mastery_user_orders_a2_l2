import { Model } from "mongoose"

export type TFullName = {
    firstName: string,
    lastName: string
}

export type TAddress = {
    street: string,
    city: string,
    country: string
}
export type TOrder = {
    productName: string,
    price: number,
    quantity: number
}

export type TUsers = {
    userId: number,
    userName: string,
    password: string,
    fullName: TFullName,
    age: number,
    email: string,
    isActive: boolean,
    hobbies: string[],
    address: TAddress,
    orders?: TOrder[]
}
// original, static method
export interface UserModel extends Model<TUsers> {
    isUserExists(userId: number): Promise<TUsers | null>
}