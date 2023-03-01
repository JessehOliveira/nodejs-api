import { PrismaClient } from ".prisma/client";

declare global {
    // var Config: {
    //     prisma: PrismaClient
    // }
    var prisma: PrismaClient
    // namespace NodeJS {
    //     interface Global {
    //         prisma: PrismaClient;
    //     }
    // }
}

export { }