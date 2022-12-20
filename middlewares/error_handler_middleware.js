module.exports = (err, req, res, next) => {
    console.log("-----에러핸들러 진입완료-----", err)
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
    } else if (err.code === 1) { //user_validations 예외처리
        res.status(401).json({
            type: err.name,
            status: 401,
            error: err.message
        });
    } else if (err.code === 2) {
        res.status(401).json({
            type: err.name,
            status: 401,
            error: "중복된 아이디 입니다."
        });
    } else if (err.code === 3) {
        res.status(401).json({
            type: err.name,
            status: 401,
            error: "중복된 닉네임 입니다."
        });
    } else if (err.code === 4) {
        res.status(401).json({
            type: err.name,
            status: 401,
            error: "아이디와 비밀번호를 모두 입력해 주세요."
        });
    } else if (err.code === 5) {
        res.status(401).json({
            type: err.name,
            status: 401,
            error: "아이디 또는 비밀번호를 확인해주세요."
        });
    } else if (err.code === 6) {
        res.status(401).json({
            type: err.name,
            status: 401,
            error: "로그인이 필요합니다. 먼저 로그인 해주세요."
        });
    } else if (err.code === 7) {
        res.status(401).json({
            type: err.name,
            status: 401,
            error: "유효기간이 만료되었습니다.다시 로그인 해주세요"
        });
    } else if (err.code === 8) {
        res.status(401).json({
            type: err.name,
            status: 401,
            error: "회원 정보가 없습니다. 다시 로그인 해주세요"
        });
    };
};
