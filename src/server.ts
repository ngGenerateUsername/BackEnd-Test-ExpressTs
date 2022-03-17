import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import helmet from 'helmet';
import express from 'express';
import 'express-async-errors';
import routers from './routes';
import bodyParse from "body-parser";
import multer from "multer";

// Constants
const app = express();
const forms = multer();
/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

// Common middlewares
// app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParse.json());
app.use(forms.fields([]));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}


/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/

// Add api router
app.use(routers);

// Error handling 
// app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
//     logger.err(err, true);
//     const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
//     return res.status(status).json({
//         error: err.message,
//     });
// });



// Export here and start in a diff file (for testing).
export default app;
