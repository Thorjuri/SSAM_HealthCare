const { Users, Evaluations, Contents, Feedbacks } = require('../models')

class EvaluationsRepository {

        createExer = async(userId, nickname, statusCode, disease, senior, obesity,
                        activity, height, weight, WHR, BMI, BMR, glucose, SBP, DBP)=> {
            const data = await Evaluations.create({
                userId, nickname, statusCode, disease, senior, obesity,
                activity, height, weight, WHR, BMI, BMR, glucose, SBP, DBP });
            return data;
        };

        getEvaluations = async(nickname)=> {
            const data = await Evaluations.findOne({ where: { nickname } });
            return data;
        };

};

module.exports = EvaluationsRepository;