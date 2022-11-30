module.exports = (err, req, res, next) => {
    console.log(err)
    if(err.code === undefined) {
        //명시하지 않은 에러
        res.status(500).json({
            name: err.name,
            status: 500,
            errrorMessate: err.message,
            Request: {
                header: req.headers,
                params: req.params,
                body: req.body,
            },
            errorStack: err.stack,
        });  
    } else if (err.code === -1) { //user_validations 예외처리
        res.status(401).json({
            type: err.name,
            status: 401,
            error: err.message
        });
    };
};





    // console.log(err);
    // if (err.status === undefined) {
    //     // 명시하지 않은 에러에 대한 처리.
    //     res.status(500).json({
    //         name: err.name,
    //         status: 500,
    //         errorMessage: err.message,
    //         Request: {
    //             header: req.headers,
    //             params: req.params,
    //             body: req.body,
    //         },
    //         errorStack: err.stack,
    //     });
    // } else {
    //     // 명시해놓은 에러에 대한 처리.
    //     res.status(err.status).json({
    //         type: err.name,
    //         status: err.status,
    //         error: err.message,
    //     });
    // }

