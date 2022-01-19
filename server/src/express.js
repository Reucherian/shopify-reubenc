import express from 'express';
import cors from 'cors';
import compression from 'compression';
import routes from './routes/index.js';

const expressLoader = ({app}) => {

    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());
    
    app.get('/status', (req,res) => {
        res.status(200).end();
    });
    
    app.head('/status', (req, res) => {
        res.status(200).end();
    });
    
    // This enables the code to run on services like Heroku
    app.enable('trust proxy');
    app.use(compression());

    // Transforms the raw string of req.s into json
    app.use(express.json());

    app.use('/',routes());

    /// Catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// Error handler

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
            message: err.message,
            },

        });
    });
}

export default expressLoader;