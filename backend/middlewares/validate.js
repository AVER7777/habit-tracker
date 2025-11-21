import { ZodError } from 'zod';

export const validate = (schema) => (req, res, next) => {
    try {
        // try to validate the data
        schema.parse({ body: req.body, query: req.query, params: req.params });

        // if no error, continue to the next middleware
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            // extract the error messages
            const errorMessage = error.issues.map((issue) => ({
                path: issue.path.join('.'),
                message: issue.message,
            }));

            // send the error response
            return res.status(400).json({
                error: 'Validation failed',
                details: errorMessage,
            });
        }

        next(error); // handle other types of errors
    }
};
