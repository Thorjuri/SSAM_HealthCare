require("dotenv").config();
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

module.exports = async (req, res, next) => {
    const err = new Error(`authorization Error`);
    const { authorization } = req.headers;
    const [authType, authToken, refreshToken] = (authorization || '').split(' ');

    if (!authToken || authType !== 'Bearer' || authToken === undefined) {
        err.code = 6; 
        next(err)
        // res.status(401).send({
        //     errorMessage: '로그인이 필요합니다. 먼저 로그인 해주세요.',
        // });
        // return;
    }

    try {
        const accessToken = jwt.verify(authToken, process.env.SECRET_KEY);
        const myRefreshToken = jwt.verify(refreshToken, process.env.SECRET_KEY );
        if(accessToken === "jwt expired" && myRefreshToken === "jwt expired") {
            err.code = 7; 
            next(err)
        };

        if(accessToken === "jwt expired" && myRefreshToken !== "jwt expired") {
            const { loginId } = jwt.decode(accessToken, process.env.SECRET_KEY);
            const userInfo = await Users.findOne({ where: { loginId }});
            if (myRefreshToken === userInfo.refreshToken) {
                const newAccessToken = jwt.sign({ loginId: userInfo.loginId }, process.env.SECRET_KEY, 
                    {
                        expiresIn: "1h"
                    });
                return newAccessToken;
            };
        };

        const { loginId } = jwt.verify(authToken, process.env.SECRET_KEY)
        const user = await Users.findOne({ 
            attributes: ['loginId', 'nickname', 'age', 'email', 'phone', 'gender', 'age'],
            where : { loginId }
        });
        if(user) {
            res.locals.user = user;
            next()
        } else {
            err.code = 8; 
            next(err)
        }
    } catch (error){
        throw error
    }
}