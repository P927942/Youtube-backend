class ApiError extends Error {

    constructor(
        statusCode, //300,400 etc
        message = "Something went wrong",
        errors = [],
        stack = "" 
    ) {

        super(message)

        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
            //stack trace stores which func,which file,which number line
        }

    }

}

//instead of writing error as throw new ApiError("user not found")
//go with throw newApiError(404,"user not found")
export { ApiError }