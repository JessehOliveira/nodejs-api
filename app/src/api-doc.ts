const apiDoc = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Skeleton Node.js API.',
            description: 'Documentação da API do projeto [Skeleton Node.js](https://github.com/Superlogica/skeleton-nodejs-api)',
            version: '1.0.0'
        },
        servers: [
            {
                url: "skeleton-nodejs.superlogica.com/api/v1",
            }
        ],
        components: {
            securitySchemes: {
                bearer_auth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT '
                }
            }
        }
    },
    apis: ['./**/routes.ts', './**/dto/*.ts', './**/handlers/exception-handler.ts', './**/exceptions/errors-type.ts'],
}

export default apiDoc;