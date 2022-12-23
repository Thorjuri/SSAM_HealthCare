const EvaluationsRepository = require('../repositories/evaluationsRepository');
const UsersRepository = require('../repositories/usersRepository');

class EvaluationsService {
    evaluationsRepository = new EvaluationsRepository();
    usersRepository = new UsersRepository();

    createExer = async(nickname, disease, activity, height, 
                        weight, waist, hip, glucose, SBP, DBP)=> {
        const err = new Error(`evaluationService Error`);
        const userInfo = await this.usersRepository.getUser(nickname);
        const { userId } = userInfo
        const WHR = (waist/hip).toFixed(2)
        const BMI = weight/((height/100)**2)
        let featureCode;
        let obesity;
        let senior;

            if(BMI >= 25.0) {
                obesity = true
                featureCode = 'ob'
            }else {
                obesity = false
                featureCode = ''
            };


            if(userInfo.age >= 65) {
                senior = true
                featureCode = 'sr'
            }else {
                senior = false
            };

        let BMR;
            if(userInfo.gender === 'M') {
                BMR = 66.47 + (13.75 * weight) + (5 * height) - (6.76 * userInfo.age)
            }else{
                BMR = 65.51 + (9.56 * weight) + (1.85 * height) - (4.68 * userInfo.age)
            };
        let diseaseCode;
            if(obesity)
            switch(disease) {
                case '당뇨병':
                    diseaseCode = 'db'
                    break
                case '고혈압':
                    diseaseCode = 'hp'
                    break
                case '골다공증':
                    diseaseCode = 'op'
                    break
                case '관절염':
                    diseaseCode = 'oa'
                    break
                case '당뇨병+고혈압':
                    diseaseCode = 'dbhp'
                    breaks
                case '정상':
                    diseaseCode = ''
                    break
            };
        const statusCode = featureCode + diseaseCode;
        const data = await this.evaluationsRepository.createExer(
                userId, nickname, statusCode, disease, senior, obesity,
                activity, height, weight, WHR, BMI, BMR, glucose, SBP, DBP);
        return data;
    };



};

module.exports = EvaluationsService;
