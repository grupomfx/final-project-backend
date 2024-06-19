import Fastify from 'fastify'
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';

import {
    getProductsBySearchLikeName,
    RegisterNewProduct,
} from "./routes/v1/product.controller.js"

import {
    listUsers,
    getUserById,
    RegisterNewUser,
    updateUser,
    searchLikeUserbyName
} from "./routes/v1/user.controller.js"

const app = Fastify({
    logger: true
})

app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

// Swagger
app.register(fastifySwagger, {})
app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
    swagger: {
        info: {
            title: ' My FirstAPP Documentation',
            description: 'My FirstApp Backend Documentation description',
            version: '0.1.0',
            termOfService: '',
            contact: {
                name: 'John Doe',
                url: ' https://www.johndoe.com',
                email: ' john.doe@email.com '
            }
        },
        externalDocs: {
            url: ' https://www.johndoe.com/api/',
            description: ''
        },
        host: '127.0.0.1:3000',
        basePath: '',
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [{
            name: 'Users',
            description: 'User API'
        },
        {
            name: 'Products',
            description: 'Products API'

        }
        ],
    },
    uiConfig: {
        docExpansion: 'none', // expande/não todas as documentações none|list|full 
        deepLinking: true
    },
    uiHooks: {
        onRequest: function(request, reply, next) {
            next()
        },
        preHandler: function(request, reply, next) {
            next()
        }
    },
    staticCSP: false,
    transformStaticCSP: (header) => header,
    exposeRoute: true
})



// Rotas de produtos 

app.register(getProductsBySearchLikeName, { prefix: '/v1/products' })
app.register(RegisterNewProduct, { prefix: '/v1/products' })

// Rotas de usuario

app.register(listUsers, { prefix: '/v1/users' })
app.register(getUserById, { prefix: '/v1/users' })
app.register(searchLikeUserbyName, { prefix: '/v1/users' })
app.register(RegisterNewUser, { prefix: '/v1/users' })
app.register(updateUser, { prefix: '/v1/users' })




try {
    await app.listen({ port: 3000 })
} catch (err) {
    app.log.error(err)
    process.exit(1)
}


