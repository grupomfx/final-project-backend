
import { searchProductsLikeName, insertNewProduct } from "../../repositories/product.repository.js"

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
                    searchName: { type: 'string', description: 'search products like by name' },
                    page: { type: 'string', description: 'page' }
                },
            },
            response: {
                200: {
                    description: 'Return products list model',
                    type: 'object',
                    properties: {
                        totalPages: { type: 'string' },
                        pageSize: { type: 'string' },
                        pageNumber: { tupe: 'string' },
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
                    description: 'products not found',
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
                const { searchName, page } = request.query

                let productsReceived = {
                    totalPages: null,
                    pageSize: null,
                    pageNumber: null,
                    products: []
                }

                await searchProductsLikeName(searchName, page, 25)
                    .then(productsFind => {
                        productsReceived.products.push(...productsFind.products)
                        productsReceived.pageNumber = productsFind.pageNumber
                        productsReceived.pageSize = productsFind.pageSize
                        productsReceived.totalPages = productsFind.totalPages
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
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            summary: 'Create new product',
            description: 'Create a new user data',
            tags: ['Products'],
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'string' },
                    unit: { type: 'string' },
                    image_url: { type: 'string' },
                    status: { type: 'string' },
                    category: { type: 'string' },

                },
                required: ['name', 'description', 'price', 'unit', 'image_url', 'status', 'category']
            },
            response: {
                201: {
                    description: 'Product created successfully',
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
                },
                400: {
                    description: 'Invalid request body or parameters',
                    type: 'object',
                    properties: {
                        code: { type: 'string' },
                        message: { type: 'string' }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            try {
                const { name, description, price, unit, image_url, status, category, created_at, updated_at } = request.body;
                const product = { name, description, price, unit, image_url, status, category, created_at, updated_at }
                let response = null
                await insertNewProduct(product)
                    .then(insertedProduct => {
                        response = insertedProduct
                    })
                    .catch(err => {
                        console.error('Cant not insert product', err)
                    })

                reply.code(201).send(response);
            } catch (error) {
                console.log(error)
                reply.code(500).send({ code: '500', message: 'Internal Server Error' });
            }
        }
    });
    done();
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





