
import { searchProductsLikeName } from "../../repositories/product.repository.js"

const listProducts = async (fastify, opt, done) => {
    fastify.get("/list", () => {
        try {


        } catch (error) {

        }

    })
    done()
    return { hello: 'world' }

}

const getProductsBySearchLikeName = async (fastify, opt, done) => {

    fastify.route({
        url: '/filter',
        method: ['GET'],
        schema: {
            summary: 'Get products search like name',
            description: 'Return a given products data by name',
            tags: ['Products'],
            querystring: {
                type: 'object',
                properties: {
                    searchLike: { type: 'string', description: 'search user like by name' }
                },
            },
            response: {
                200: {
                    description: 'Return products list model',
                    type: 'object',
                    properties: {
                        products: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    name: { type: 'string' },
                                    description: { type: 'string' },
                                    price: { type: 'string' },
                                    unit: { type: 'string' },
                                    image_url: { type: 'string' },
                                    status: { type: 'string' },
                                    category: { type: 'string' },
                                    created_at: { type: 'string' },
                                    updated_at: { type: 'string' }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'Users not found',
                    type: 'object',
                    properties: {
                        code: {
                            type: 'string'
                        },
                        message: {
                            type: 'string'
                        }
                    }
                }
            }
        },
        handler: async (request, reply) => {

            try {
                const { searchLike } = request.query
                let productsReceived = { products: [] }

                await searchProductsLikeName(searchLike)
                    .then(productsFind => {
                        productsReceived.products.push(...productsFind)
                    })
                    .catch(err => {
                        console.error('Error search products', err)
                    })

                reply.code(201).send(productsReceived);

            }
            catch (error) {
                console.log(error)
                reply.code(500).send({ code: '500', message: 'Internal Server Error' });

            }
        }
    })
    done();
}


const RegisterNewProduct = async (fastify, opt, done) => {
    fastify.get("/register", () => {
        try {


        } catch (error) {

        }

    })
    done()
    return { hello: 'world' }

}


const updateProductById = async (fastify, opt, done) => {
    fastify.get("/update", () => {
        try {


        } catch (error) {

        }

    })
    done()
    return { hello: 'world' }

}


const deleteProductById = async (fastify, opt, done) => {
    fastify.get("/delete", () => {
        try {


        } catch (error) {

        }

    })
    done()
    return { hello: 'world' }


}


export { listProducts, getProductsBySearchLikeName, RegisterNewProduct, updateProductById, deleteProductById }





