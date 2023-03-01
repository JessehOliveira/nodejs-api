import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

interface ORMErrors {
    notFound?: (error: Error) => void
    alreadyExists?: (error: Error) => void
    dataIntegrity?: (error: Error) => void
}

export default class ORMExceptions{

    static explode(error: Error, handlers: ORMErrors): never {
        this.analize(error, handlers)
        throw error
    }

    static analize(error: Error, handlers: ORMErrors): boolean {

        // https://www.prisma.io/docs/reference/api-reference/error-reference
        if (error instanceof PrismaClientKnownRequestError) {
            if ((error as PrismaClientKnownRequestError).code === "P2002" ) {
                if (handlers.alreadyExists) {
                    handlers.alreadyExists(error)
                    return true
                }
            }

            if ((error as PrismaClientKnownRequestError).code === "P2025" ) {
                if (handlers.notFound) {
                    handlers.notFound(error)
                    return true
                }
            }

            if ((error as PrismaClientKnownRequestError).code === "P2014" ) {
                if (handlers.dataIntegrity) {
                    handlers.dataIntegrity(error)
                    return true
                }
            }
        }

        return false
    }
}