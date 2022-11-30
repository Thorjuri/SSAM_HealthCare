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
            gender: Joi.string().required(),
            age: Joi.number().required()
        }); 
    
    try { // 검사시작 
        await schema.validateAsync(body); 
    } catch (error) { // 유효성 검사 에러 
        // return res.status(400).json({ code: 400, message: error.message });
        const err = error
        err.code = -1
        throw err
        } 
    next(); 
    } 
}; 
    module.exports = user_validation;
