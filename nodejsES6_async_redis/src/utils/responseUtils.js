const Status = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNSUPPORTED_ACTION: 405,
    VALIDATION_FAILED: 422,
    SERVER_ERROR: 500
}

function statusMessage(status) {
    switch (status) {
        case Status.BAD_REQUEST:
            return 'Bad Request';
        case Status.UNAUTHORIZED:
            return 'Unauthorized';
        case Status.FORBIDDEN:
            return 'Forbidden';
        case Status.NOT_FOUND:
            return 'Not Found';
        case Status.UNSUPPORTED_ACTION:
            return 'Unsupported Action';
        case Status.VALIDATION_FAILED:
            return 'Validation Failed';
        case Status.SERVER_ERROR:
            return 'Internal Server Error';
    }
}

function jsonResponse(res, data=null, options, message="", error=null) {
    options = options || {};
    options.status = options.status || Status.OK;
    let success = (options.status == 200) ? true : false;
    res.status(options.status).json({
        data: data || null,
        success: success,
        message: message,
        error: error
    });
}


export default class ResponseService {
    constructor() { }

    static serverError(req, res, data, error) {
        if (error instanceof Error) {
            error = {
                message: error.message,
                stacktrace: error.stack
            };
        }
        jsonResponse(res,null, {status: Status.SERVER_ERROR},statusMessage(Status.SERVER_ERROR), error);
    }


    static success(req, res, data, message) {
        jsonResponse(res, data, {status: Status.OK}, message);
    }


    static notFound(req, res){
        jsonResponse(res, null, {status: Status.NOT_FOUND}, statusMessage(Status.NOT_FOUND));
    }
    


}