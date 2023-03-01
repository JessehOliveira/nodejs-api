import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiThings from 'chai-things'
import app from '../../src/app'

chai.use(chaiHttp);
chai.should();
chai.use(chaiThings);

describe('API DOCs Routes', ()=> {

    describe("GET /api-docs.json", () => {

        it("should get API documentation", (done) => {

            chai.request(app)
                .get('/api-docs.json')
                .send()
                .end((error, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    done()
                });
        });
    })
})