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
        return res.status(201).send(data);
    };

    getExerResult = async(req, res)=> {
        const nickname = res.locals.user;
        const data = await this.evaluationsService.getExerResult(nickname);
        return res.status(201).send(data);
    };

    createDiet = async(req, res)=> {
        const nickname = res.locals.user;
        const { intake } = req.body;
        const data = await this.evaluationsService.createDiet(nickname, intake);
        return res.status(201).send(data);
    };

    getDietResult = async(req, res)=> {
        const nickname = res.locals.user;
        const data = await this.evaluationsService.getDietResult(nickname);
    };
};

module.exports = EvaluationsController;