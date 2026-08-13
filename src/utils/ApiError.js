class ApiError extends Error {
    constructor(
        statusCode,
        message="Somethig went wrong",
        error =[],
        statck =""
    )
    {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = false;
        this.error = errors
        this.streak = sterak
    }
}
export {ApiError};