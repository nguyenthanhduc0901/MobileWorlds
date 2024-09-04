class ExpressError extends Error {
    constructor(message, statusCode, details = {}) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.details = details; // Add details about the error
        this.stack = (new Error()).stack; // Optional: include stack trace
    }
}

module.exports = ExpressError;
