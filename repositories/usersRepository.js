const {Contents, Evaluations, Feedbacks, Users} = require('../models')

class UsersRepository {

    signup = async(loginId, password, nickname, email, phone, gender, age)=> {
        const data = await Users.create({ loginId, password, nickname, email, phone, gender, age });
        return {
            loginId: data.loginId,
            nickname: data.nickname,
            message: "회원가입이 완료되었습니다." };
    };

    checkId = async(loginId)=> {
        const data = await Users.findOne({
            attributes: ['loginId', 'password', 'nickname'],
            where: { loginId }
        });
        return data;
    };

    updateRefreshToken = async(refreshToken, user)=> {
        await Users.update({ refreshToken }, { where : { loginId: user.loginId }});
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
    }

};

module.exports = UsersRepository;