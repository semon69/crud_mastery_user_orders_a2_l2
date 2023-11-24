import { Model } from "mongoose"

// Declare type of full name
export type TFullName = {
    firstName: string,
    lastName: string
}

// Declare type of address
export type TAddress = {
    street: string,
    city: string,
    country: string
}

// Declare type of order
export type TOrder = {
    productName: string,
    price: number,
    quantity: number
}

// Declare type of a User
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
    orders?: TOrder[],
}

// create static method to find is user exist or not
export interface UserModel extends Model<TUsers> {
    // eslint-disable-next-line no-unused-vars
    isUserExists(userId: number): Promise<TUsers | null>
}