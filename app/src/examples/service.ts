import { Example } from ".prisma/client"
import IdGenerator from "../libs/core/id-generator";
import { ExampleAlreadyExistsError } from "../libs/exceptions/example-already-exists-error";
import { ExampleNotFoundError } from "../libs/exceptions/example-not-found";
import ORMExceptions from "../libs/orm/exceptions";
import prisma from '../libs/orm/prisma';
import { ExampleCreateDTO } from "./dto/create";
import { ExampleUpdateDTO } from "./dto/update";

export default class ExamplesService {
    async getAll(limit: number, offset: number): Promise<Example[]> {
        return await prisma.example.findMany({
            take: limit, skip: offset-1
        })
    }

    async get(id: number): Promise<Example> {
        const example = await prisma.example.findUnique({ where: { id } })

        if (!example) {
            throw new ExampleNotFoundError(id)
        }

        return example
    }

    async delete(id: number): Promise<Example> {
        try {
            return await prisma.example.delete({ where: { id } })
        } catch (error: any) {
            ORMExceptions.explode(error, {
                notFound: () => {
                    throw new ExampleNotFoundError(id)
                }
            })
        }
    }

    async update(id: number, example: ExampleUpdateDTO): Promise<Example> {
        try {
            return await prisma.example.update({
                where: { id },
                data: {
                    name: example.name
                }
            })
        } catch (error: any) {
            ORMExceptions.explode(error, {
                notFound: () => {
                    throw new ExampleNotFoundError(id)
                }
            })
        }
    }

    async create(example: ExampleCreateDTO): Promise<Example> {
        // const idGenerator: IdGenerator = new IdGenerator()
        try {
            return await prisma.example.create(
                {
                    data: {
                        id: IdGenerator.generate(),
                        name: example.name, 
                        email: example.email
                    }
                }
            )
        } catch (error: any) {
            ORMExceptions.explode(error, {
                alreadyExists: () => {
                    throw new ExampleAlreadyExistsError()
                }
            })
        }
    }
}