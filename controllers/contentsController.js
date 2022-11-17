const ContentsService = require('../services/contentsService');

class ContentsController {
    contentsService = new ContentsService
};

module.exports = ContentsController;