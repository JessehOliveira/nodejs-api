import { expect } from "chai"
import ExamplesService from "../../src/examples/service"
import { ExampleAlreadyExistsError } from "../../src/libs/exceptions/example-already-exists-error"
import { ExampleNotFoundError } from "../../src/libs/exceptions/example-not-found"

const examplesService = new ExamplesService()

describe('Example Service', ()=> {
    before(
        async () => {
            await examplesService.create(
                {
                    name: '?',
                    email: 'already-exists@teste.com'
                }
            )
        }
    )

    it('it should create a Example', async () => {

        const example = await examplesService.create(
            {
                name: 'Test',
                email: 'teste@teste.com'
            }
        )

        expect(example.id).to.not.be.null
        expect('Test').to.be.equal(example.name)
        expect('teste@teste.com').to.be.equal(example.email)
        expect(example.createdAt).to.not.be.null
        expect(example.updatedAt).to.not.be.null
    })

    it('it should create a Example without name', async () => {

        const example = await examplesService.create(
            {
                email: 'teste2@teste.com'
            }
        )

        expect(example.id).to.not.be.null
        expect(example.name).to.be.null
        expect('teste2@teste.com').to.be.equal(example.email)
        expect(example.createdAt).to.not.be.null
        expect(example.updatedAt).to.not.be.null
    })

    it('it should not create a Example that already exists', async () => {

        try {
            await examplesService.create(
                {
                    name: '!',
                    email: 'already-exists@teste.com'
                }
            )
        } catch (error) {
            expect(error instanceof ExampleAlreadyExistsError).to.be.true
        }
    })

    it('it should not get a Example by id that not exists', async () => {
        try {
            await examplesService.get(-1)
        } catch(error) {
            expect(error instanceof ExampleNotFoundError).to.be.true
        }
    })

    it('it should get a Example by id', async () => {

        const createdExample = await examplesService.create(
            {
                name: 'Test 3',
                email: 'teste3@teste.com'
            }
        )

        const example = await examplesService.get(createdExample.id)

        expect(createdExample.id).to.equal(example.id)
        expect(createdExample.name).to.be.equal(example.name)
        expect(createdExample.email).to.be.equal(example.email)
    })

    it('it should get all Examples', async () => {
        const example = await examplesService.getAll(10, 1)

        expect(example.length).to.be.greaterThan(0)
    })

    it('it should get all Examples paginated', async () => {
        const example = await examplesService.getAll(1, 2)

        expect(example.length).to.be.equal(1)
    })

    it('it should not update a Example by id that not exists', async () => {

        try {
            await examplesService.update(-1, {name: "?"})
        } catch(error) {
            expect(error instanceof ExampleNotFoundError).to.be.true
        }
    })

    it('it should update a Example by id', async () => {

        const createdExample = await examplesService.create(
            {
                name: 'Test 4',
                email: 'teste4@teste.com'
            }
        )

        const updatedExample = await examplesService.update(createdExample.id, {name: "Test 4 !"})

        expect(createdExample.id).to.equal(updatedExample.id)
        expect("Test 4 !").to.be.equal(updatedExample.name)
        expect(createdExample.email).to.be.equal(updatedExample.email)
    })

    it('it should not delete a Example by id that not exists', async () => {

        try {
            await examplesService.delete(-1)
        } catch(error) {
            expect(error instanceof ExampleNotFoundError).to.be.true
        }
    })

    it('it should delete a Example by id', async () => {

        const createdExample = await examplesService.create(
            {
                name: 'Test 5',
                email: 'teste5@teste.com'
            }
        )

        examplesService.delete(createdExample.id)

        try {
            await examplesService.get(createdExample.id)
        } catch(error) {
            expect(error instanceof ExampleNotFoundError).to.be.true
        }
    })
})