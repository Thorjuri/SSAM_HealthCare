const {Contents, Evaluations, Feedbacks, Users} = require('../models')

class UsersRepository {

    signup = async(loginId, password, nickname, email, phone, gender)=> {
        const data = await Users.create({loginId, password, nickname, email, phone, gender});
        return {data, message: "회원가입이 완료되었습니다."};
    };

    checkDup = async(checkThing)=> {
        let source;
        let data;
            if(checkThing.loginId){ 
                source = checkThing.loginId; 
                data = await Users.findOne({ where : { loginId: source }});
            }else {
                source = checkThing.nickname;
                data = await Users.findOne({ where : { nickname: source }}); 
            };
        return data;
    };

    login = async(loginId, password)=> {
        const data = await Users.findOne({ where : { loginId, password }});
        return data;
    };

    getUser = async(nickname)=> {
        const data = await Users.findOne({
            attributes: {exclude: ['password']},
            where : { nickname }
        });
        return data;
    };
};

module.exports = UsersRepository;