import mongoose from "mongoose";
import logger from "jet-logger";

(async()=>{
    try {
        await mongoose.connect(process.env.URL_MONGOOSE||"mongodb://localhost:27017/admin");
        logger.imp('Connected To Db Succefully!');
    } catch (error) {
        logger.err('Error while Connecting to DB!');
    }
})();