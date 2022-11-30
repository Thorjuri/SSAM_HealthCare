const UsersRepository = require('../repositories/usersRepository');
const {user_singup} = require('../middlewares/user_validation');

class UsersService {
    usersRepository = new UsersRepository();

    signup = async(loginId, password, confirmPass, nickname, email, phone, gender)=> {
        const err = new Error(`reservationsService Error`);

    };
};

module.exports = UsersService;
