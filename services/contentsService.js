const ContentsRepository = require('../repositories/contentsRepository');

class ContentsService {
    contentsRepository = new ContentsRepository();

};

module.exports = ContentsService;
