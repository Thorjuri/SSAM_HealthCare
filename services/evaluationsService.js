const EvaluationsRepository = require('../repositories/evaluationsRepository');
const UsersRepository = require('../repositories/usersRepository');
const ContentsRepository = require('../repositories/contentsRepository');

class EvaluationsService {
    evaluationsRepository = new EvaluationsRepository();
    usersRepository = new UsersRepository();
    contentsRepository = new ContentsRepository();

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

            if(userInfo.age >= 65) { //시니어가 비만보다 우선
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

    getExerResult = async(nickname)=> {
        const { statusCode } = await this.evaluationsRepository.getEvaluations(nickname);
        const contents = await this.contentsRepository.getContents(statusCode);
        return { statusCode, contents };
    };

    dietEvaluations = async(nickname, intake)=> {
        const { BMR, activity } = await this.evaluationsRepository.getEvaluations(nickname);
        const RDI = 0;  //일일권장섭취량(Recommended Daily Intake)
        if(activity === 1){
            RDI = BMR * 1.2  + (BMR * 0.1);  //activity에 따른 활동계수 연산
        }else if(activity === 2){
            RDI = BMR * 1.3 + (BMR * 0.1);
        }else if(activity === 3){
            RDI = BMR * 1.5 + (BMR * 0.1);
        }else if(activity === 4){
            RDI = BMR * 1.75 + (BMR * 0.1);
        };

        if(intake >= (RDI*1.1)){
            return { RDI, message: "일일권장섭취량의 10% 이상 초과하였습니다. 일일 섭취 열량을 줄이세요." }
        }else if(intake < (RDI*0.9)){
            return { RDI, message: "일일권장섭취량 대비 10% 이상 부족합니다. 섭취량을 보충해주세요." }
        }else {
            return { RDI, message: "섭취량이 적절합니다. 현재 식사량을 유지해주세요." }
        };
    };
};

module.exports = EvaluationsService;
