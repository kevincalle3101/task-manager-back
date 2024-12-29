import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path';


const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API Documentation',
            version: '1.0.0',
            description: 'API for managing tasks',
            contact: {
                name: 'Kevin Calle Mendoza'
            }
        },
    },
    apis: [`${path.join(__dirname, '../src/router/*')}`],
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;