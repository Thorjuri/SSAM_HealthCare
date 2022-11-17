const EvaluationsRepository = require('../repositories/evaluationsRepository');

class EvaluationsService {
    evaluationsRepository = new EvaluationsRepository();

};

module.exports = EvaluationsService;
