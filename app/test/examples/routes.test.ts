import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import chaiThings from 'chai-things'
import app from '../../src/app'
import faker from 'faker'
import sinon from 'sinon'
import IdGenerator from '../../src/libs/core/id-generator'

chai.use(chaiHttp);
chai.should();
chai.use(chaiThings);

describe('Example Routes', ()=> {

    const preExample = {
        name: faker.name.findName(),
        email: faker.internet.email()
    }

    before(
        () => {
            chai.request(app)
                .post('/examples')
                .set('content-type', 'application/json')
                .send(
                    preExample
                )
                .end(() => {});
        }
    )

    describe("POST /examples", () => {
        it("should create a example", (done) => {
            const exampleFaker = {
                name: faker.name.findName(),
                email: faker.internet.email()
            }

            chai.request(app)
                .post('/examples')
                .set('content-type', 'application/json')
                .send(
                    exampleFaker
                )
                .end((error, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.id.should.not.be.null
                    response.body.name.should.be.equal(exampleFaker.name)
                    response.body.email.should.be.equal(exampleFaker.email)
                    done();
                });
        });

        it("should not create a example that already exists", (done) => {
            chai.request(app)
                .post('/examples')
                .set('content-type', 'application/json')
                .send(
                    preExample
                )
                .end((error, response) => {
                    response.body.code.should.be.equal('EXAMPLE_ALREADY_EXISTS')
                    response.should.have.status(409);
                    done();
                });
        });
    })

    describe("GET /examples", () => {

        const preExample = {
            name: faker.name.findName(),
            email: faker.internet.email()
        }

        const preExample2 = {
            name: faker.name.findName(),
            email: faker.internet.email()
        }
        
        before(
            () => {
                const stub = sinon.stub(IdGenerator, "generate").onFirstCall().returns(999)

                chai.request(app)
                    .post('/examples')
                    .set('content-type', 'application/json')
                    .send(
                        preExample
                    )
                    .end(() => { 
                        expect(stub.calledOnce).to.be.true
                        sinon.restore() 

                        const stub2 = sinon.stub(IdGenerator, "generate").onFirstCall().returns(888)

                        chai.request(app)
                            .post('/examples')
                            .set('content-type', 'application/json')
                            .send(
                                preExample2
                            )
                            .end(() => { 
                                expect(stub2.calledOnce).to.be.true
                                sinon.restore() 
                            });
                    });
            }
        )

        it("should not get a example that not exists", (done) => {
            chai.request(app)
                .get('/examples/0')
                .send()
                .end((error, response) => {
                    response.body.code.should.be.equal('EXAMPLE_NOT_FOUND')
                    response.should.have.status(404);
                    done();
                });
        });

        it("should not get a example with invaild id", (done) => {
            chai.request(app)
                .get('/examples/x')
                .send()
                .end((error, response) => {
                    response.body.code.should.be.equal('UNKNOW_ERROR')
                    response.should.have.status(500);
                    done();
                });
        });

        it("should get a example", (done) => {

            chai.request(app)
                .get('/examples/999')
                .send()
                .end((error, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.id.should.be.equal(999)
                    response.body.name.should.be.equal(preExample.name)
                    response.body.email.should.be.equal(preExample.email)
                    done()
                });
        });

        it("should get all examples", (done) => {

            chai.request(app)
                .get('/examples')
                .send()
                .end((error, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    response.body.should.include.something.that.deep.equals(
                        { 
                            id: 999,
                            name: preExample.name,
                            email: preExample.email
                        }
                    )
                    response.body.should.include.something.that.deep.equals(
                        { 
                            id: 888,
                            name: preExample2.name,
                            email: preExample2.email
                        }
                    )
                    done()
                });
        });

        it("should get all examples with pagination", (done) => {

            chai.request(app)
                .get('/examples?filter[limit]=1&filter[offset]=1')
                .send()
                .end((error, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array')
                    expect(response.body).to.have.lengthOf(1);
                    done()
                });
        });

        it("should not get all examples with invalid pagination", (done) => {

            chai.request(app)
                .get('/examples?filter[limit]=x&filter[offset]=x')
                .send()
                .end((error, response) => {
                    response.body.code.should.be.equal('UNKNOW_ERROR')
                    response.should.have.status(500);
                    done()
                });
        });

    })

    describe("DELETE /examples", () => {

        const preExample = {
            name: faker.name.findName(),
            email: faker.internet.email()
        }
        
        before(
            () => {
                const stub = sinon.stub(IdGenerator, "generate").onFirstCall().returns(777)

                chai.request(app)
                    .post('/examples')
                    .set('content-type', 'application/json')
                    .send(
                        preExample
                    )
                    .end(() => { 
                        expect(stub.calledOnce).to.be.true
                        sinon.restore()
                    });
            }
        )

        it("should not delete a example that not exists", (done) => {
            chai.request(app)
                .delete('/examples/0')
                .send()
                .end((error, response) => {
                    response.body.code.should.be.equal('EXAMPLE_NOT_FOUND')
                    response.should.have.status(404);
                    done();
                });
        });

        it("should delete a example", (done) => {

            chai.request(app)
                .delete('/examples/777')
                .send()
                .end((error, response) => {
                    response.should.have.status(204)
                    done()
                });
        });

    })

    describe("PATCH /examples", () => {

        const preExample = {
            name: faker.name.findName(),
            email: faker.internet.email()
        }

        const updatedExample = {
            name: faker.name.findName(),
            email: preExample.email
        }
        
        before(
            () => {
                const stub = sinon.stub(IdGenerator, "generate").onFirstCall().returns(776)

                chai.request(app)
                    .post('/examples')
                    .set('content-type', 'application/json')
                    .send(
                        preExample
                    )
                    .end(() => { 
                        expect(stub.calledOnce).to.be.true
                        sinon.restore()
                    });
            }
        )

        it("should not update a example that not exists", (done) => {
            chai.request(app)
                .patch('/examples/0')
                .send(
                    {
                        name: updatedExample.name
                    }
                )
                .end((error, response) => {
                    response.body.code.should.be.equal('EXAMPLE_NOT_FOUND')
                    response.should.have.status(404);
                    done();
                });
        });

        it("should update a example", (done) => {

            chai.request(app)
                .patch('/examples/776')
                .send(
                    {
                        name: updatedExample.name
                    }
                )
                .end((error, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.id.should.be.equal(776)
                    response.body.name.should.be.equal(updatedExample.name)
                    response.body.email.should.be.equal(updatedExample.email)
                    done()
                });
        });

    })
})