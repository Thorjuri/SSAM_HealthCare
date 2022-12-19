const UsersRepository = require('../repositories/usersRepository');
const {user_singup} = require('../middlewares/user_validation');
const bcrypt = require('bcrypt')

class UsersService {
    usersRepository = new UsersRepository();

    signup = async(loginId, password, nickname, email, phone, gender)=> {
        const err = new Error(`usersService Error`);
        const salt = bcrypt.genSaltSync(10);
        const hashedPW = bcrypt.hashSync(password, salt);
        password = hashedPW;
        const data = await this.usersRepository.signup(loginId, password, nickname, email, phone, gender);
        return data;
    };

    checkDup = async(checkThing)=> {
        const data = await this.usersRepository.checkDup(checkThing);
        const err = new Error(`usersService Error`);
            if(data.loginId === checkThing.loginId){
                err.code = 2 //중복된 아이디
                throw err
            }else if(data.nickname === checkThing.nickname){
                err.code = 3 //중복된 닉네임
                throw err
            }
        return data;
    };

    login= async(loginId, password)=> {
        const err = new Error(`usersService Error`)
        if(!loginId || !password){
            err.code = 4
            throw err;
        };
        const data = await this.usersRepository.login(loginId, password)
        return data;
    };
};

module.exports = UsersService;
