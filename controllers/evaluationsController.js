const EvaluationsService = require('../services/evaluationsService');

class EvaluationsController {
    evaluationsService = new EvaluationsService

    createExer = async(req, res)=> {
        const nickname = res.locals.user;
        const { 
            disease, activity, height, weight, 
            waist, hip, glucose, SBP, DBP 
        } = req.body;
        const data = await this.evaluationsService.createExer(
            nickname, disease, activity, height, 
            weight, waist, hip, glucose, SBP, DBP);
        res.status(201).send(data);
    };

    getExerResult = async(req, res)=> {
        const nickname = res.locals.user;
        const data = await this.evaluationsService.getExerResult(nickname);
        res.status(200).send(data);
    };

    dietEvaluations = async(req, res)=> {
        const nickname = res.locals.user;
        const { intake } = req.body;
        const data = await this.evaluationsService.dietEvaluations(nickname, intake);
        res.status(201).send(data);
    };
};

module.exports = EvaluationsController;