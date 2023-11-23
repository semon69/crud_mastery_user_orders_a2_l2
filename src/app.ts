import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/users.route';
const app: Application = express()

// parser
app.use(express.json());
app.use(cors());

app.use("/api/users", UserRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from new assignment!')
})
export default app;