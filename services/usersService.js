const UsersRepository = require('../repositories/usersRepository');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const users = require('../models/users');
require("dotenv").config();

class UsersService {
    usersRepository = new UsersRepository();

    signup = async(loginId, password, nickname, email, phone, gender, age)=> {
        const err = new Error(`usersService Error`);
        const salt = bcrypt.genSaltSync(10);
        const hashedPW = bcrypt.hashSync(password, salt);
        password = hashedPW;
        const data = await this.usersRepository.signup(loginId, password, nickname, email, phone, gender, age);
        return data;
    };

    login= async(loginId, password)=> {
        const err = new Error(`usersService Error`);
        if(!loginId || !password){ //필수값공란
            err.code = 4;
            throw err;
        };

        const user = await this.usersRepository.checkId(loginId);
        if(!user) {
            err.code = 5;
            throw err;
        }
        const checkPass = await bcrypt.compare(password, user.password);
        if(!checkPass) {
            err.code = 5;
            throw err;
        };

        const accessToken = jwt.sign({ loginId: user.loginId }, process.env.SECRET_KEY, 
        {
            expiresIn: "1h"
        });
        const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });
        await this.usersRepository.updateRefreshToken(refreshToken, user);
        return { loginId: user.loginId, accessToken: `Bearer ${accessToken}`, refreshToken };
    };

    checkDup = async(checkThing)=> {
        const data = await this.usersRepository.checkDup(checkThing);
        const err = new Error(`usersService Error`);
            if(!data) {
                return {message: "사용 가능합니다."}
            }
            if(data.loginId === checkThing.loginId){
                err.code = 2; //중복된 아이디
                throw err;
            }else if(data.nickname === checkThing.nickname){
                err.code = 3; //중복된 닉네임
                throw err;
            };
        return data;
    };
};

module.exports = UsersService;
