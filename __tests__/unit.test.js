const UsersController = require('../controllers/usersController');
let usersController = new UsersController();
let usersService = usersController.usersService

describe('임시 유닛테스트', () => {
    
    afterAll(async() => { });
    
    jest.spyOn(usersService, "signup");

    const req = {
        body: {
            loginId: 'thor',
            password: "12345",
            confirmPass: "12345",
            nickname: "email",
            phone: "010-1234-5678",
            gender: "F"
        }
    };
    const res = {
        _status: null,
        _json: null,
        status: function (code) {
            this._status = code
            return this
        },
        send: function (json) {
            this._json = json
            return this
        }
    };
    
    test("controller Signup 함수 정상 작동 시, services/signup 1회 호출", async() => {
        await usersController.signup(req,res)
        await expect(usersService.signup).toBeCalledTimes(1);
    });
});
