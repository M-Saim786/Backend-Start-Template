export const errorResponse = (res, statusCode, message) =>
    res.status(statusCode).json({ message });

export const successResponse = (res, statusCode, message, data = []) =>
    res.status(statusCode).json({ message, data, });
