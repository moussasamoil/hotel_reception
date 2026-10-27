import { connectionDB } from "./config/database.js";
import { userRoutes } from "./modules/user/user.controller.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";


export const bootstrap = async (app, express) => {
    app.use(express.json());
    // connection db
    connectionDB()

    // routes end point
    app.use(userRoutes)


    // global err handler 
    app.use(globalErrorHandler)
}