const Joi = require("joi");

const user_validation = { 
	user_singup : async (req, res, next) =>{ 
        const body = req.body; 
        const schema = Joi.object().keys({ 
            loginId: Joi.string().min(5).max(13).required(),
            nickname: Joi.string().required()
                        .pattern(new RegExp('^[a-zA-Z0-9]{4,20}$')), 
            password: Joi.string()
                        .pattern(new RegExp('^[a-zA-Z0-9]{5,20}$')),
            confirmPass: Joi.ref('password'), 
            email: Joi.string().email().required(), 
            phone: Joi.string(),
            gender: Joi.string().required(),
            age: Joi.number().required()
        }); 
    
    try { // 검사시작 
        await schema.validateAsync(body);
        next() 
    } catch (err) { // 유효성 검사 에러 
        err.code = 1
        next(err); 
        } 
    } 
}; 
    module.exports = user_validation;
