import { z } from "zod";

const FullNameSchemaZod = z.object({
    firstName: z.string().min(1).max(20),
    lastName: z.string().min(1).max(20),
});

const AddressSchemaZod = z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
});

const OrderSchemaZod = z.object({
    productName: z.string().min(1),
    price: z.number().nonnegative().min(1),
    quantity: z.number().nonnegative().min(1),
});

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
    orders: z.array(OrderSchemaZod).optional(),
});

export { UserSchemaZod, OrderSchemaZod }