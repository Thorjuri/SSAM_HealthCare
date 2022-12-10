const request = require("supertest");
const app = require("../app");
const application = request(app);

describe("임시 슈퍼테스트", () => {

    test("서버 정상 작동 시 메세지 확인", async() => {
        const res = await application.get("/");
        await expect(res.text).toEqual("서버 정상 작동 중😏😏");
    });
});