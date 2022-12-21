const UsersService = require('../services/usersService');

class UsersController {
    usersService = new UsersService

    signup = async(req, res)=> {
        const { loginId, password, nickname, email, phone, gender, age } = req.body;
        const data = await this.usersService.signup(loginId, password, nickname, email, phone, gender, age);
        res.status(201).send(data);
    };

    login = async(req, res)=> {
        const { loginId, password } = req.body;
        const data = await this.usersService.login(loginId, password);
        res.status(201).send(data);
    };

    checkDup = async(req, res)=> {
        const { checkThing } = req.body;
        const data = await this.usersService.checkDup(checkThing);
        res.status(201).send(data);
    };


};

module.exports = UsersController;