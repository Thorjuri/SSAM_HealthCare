const { Users, Evaluations, Contents, Feedbacks } = require('../models')

class ContentsRepository {

    getContents = async(statusCode)=> {
        const data = await Contents.findOne({ where: { statusCode } });
        return data;
    };
};

module.exports = ContentsRepository;