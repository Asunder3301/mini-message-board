export class CustomNotFoundError extends Error {
    constructor(message) {
        super(message);
        
        this.statusCode = process.env.NOT_FOUND_STATUS || 404;
        this.name = "NotFoundError";
    }
}