import { Schema, model } from "mongoose";
import { TUsers } from "./users/users.interface";


const FullNameSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
});

const AddressSchema = new Schema({
    street: {
        type: String,
        required: [true, 'Street name is required'],
    },
    city: {
        type: String,
        required: [true, 'City name is required'],
    },
    country: {
        type: String,
        required: [true, 'Country name is required'],
    },
});

const OrderSchema = new Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
    },
});

const UserSchema = new Schema({
    userId: {
        type: Number,
        required: [true, 'Name is required'],
        unique: true
    },
    userName: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    fullName: {
        type: FullNameSchema,
        required: [true, 'FullName is required'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    isActive: {
        type: Boolean,
        required: [true, 'isActive is required'],
    },
    hobbies: {
        type: [String],
        required: [true, 'Hobbies are required']
    },
    address: {
        type: AddressSchema,
        required: [true, 'Address is required'],
    },
    orders: {
        type: [OrderSchema],
    },
});

export const Users = model<TUsers>('Users', UserSchema);
