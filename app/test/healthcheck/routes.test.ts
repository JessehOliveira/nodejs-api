import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiThings from 'chai-things'
import app from '../../src/app'

chai.use(chaiHttp);
chai.should();
chai.use(chaiThings);

describe('Healthcheck Routes', ()=> {

    describe("GET /healthcheck", () => {

        it("should get healthcheck", (done) => {

            chai.request(app)
                .get('/healthcheck')
                .send()
                .end((error, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.ok.should.be.true
                    done()
                });
        });

        it("should not get healthcheck", (done) => {

            chai.request(app)
                .get('/x')
                .send()
                .end((error, response) => {
                    response.should.have.status(404)
                    done()
                });
        });

    })
})