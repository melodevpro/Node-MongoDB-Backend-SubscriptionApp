
const errorMiddleware = (err, req, res, next) => {}
try {
    let error = { ...err };
    error.message = err.message;

    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Recurso no encontrado con id ${err.value}`;
        error = new Error(message);
        error.statusCode = 404;
    }

    // Mongoose duplicate key
    if(err.code === 11000) {
        const message = 'Ya existe un recurso con ese email';
        error = new Error(message);
        error.statusCode = 400;
    }

    // Mongoose validation error
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new Error(message.join('. '));
        error.statusCode = 400;
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Error interno del servidor',
    });
    } catch (error) {
        next(error);
    }

    export default errorMiddleware;