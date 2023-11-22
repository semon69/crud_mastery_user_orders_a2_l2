import { z } from "zod";

// Zod schema for FullName
const FullNameSchemaZod = z.object({
    firstName: z.string().min(1).max(20),
    lastName: z.string().min(1).max(20),
});

// Zod schema for Address
const AddressSchemaZod = z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
});

// Zod schema for Order
const OrderSchemaZod = z.object({
    productName: z.string().min(1),
    price: z.number().nonnegative(),
    quantity: z.number().nonnegative(),
});

// Zod schema for User
const UserSchemaZod = z.object({
    userId: z.number().nonnegative(),
    userName: z.string().min(1).max(20),
    password: z.string().min(1),
    fullName: FullNameSchemaZod,
    age: z.number().nonnegative(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string().min(1)),
    address: AddressSchemaZod,
    orders: z.array(OrderSchemaZod),
});

export default UserSchemaZod