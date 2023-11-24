import { Schema, model } from "mongoose";
import { TAddress, TFullName, TOrder, TUsers, UserModel } from "./users/users.interface";
import config from "../config";
import bcrypt from "bcrypt"


// Full name schema for type TFullName
const FullNameSchema = new Schema<TFullName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
});

// Address schema for type TAddress
const AddressSchema = new Schema<TAddress>({
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

// Order schema for type TOrder
const OrderSchema = new Schema<TOrder>({
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

// User schema for type TUsers and pass userModel to find user exist or not
const UserSchema = new Schema<TUsers, UserModel>({
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
        required: false
    }
});

// Pre save middleware / hooks for hash password
UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds))
    next()
})

// Post save middleware/hooks
UserSchema.post('save', async function (doc, next) {
    doc.password = " "
    next()
})

// create static method to find is user exist or not
UserSchema.statics.isUserExists = async function (userId: number) {
    const existingUser = await Users.findOne({ userId })
    return existingUser
}

export const Users = model<TUsers, UserModel>('Users', UserSchema);
