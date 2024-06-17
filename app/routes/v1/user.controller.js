
import search_users from "../../repositories/user.repository.js"

const listUsers = async (fastify, opt, done) => {
    fastify.route({
        url: '/list',
        method: ['GET'],
        schema: {
            summary: 'Get users data',
            description: 'Return a given users data',
            tags: ['User'],
            response: {
                200: {
                    description: 'Return user list model',
                    type: 'object',
                    properties: {
                        users: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    name: { type: 'string' },
                                    email: { type: 'string' }
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

            let usersReceived = { users: [] }
            await search_users()
                .then(usersFind => {
                    usersReceived.users.push(...usersFind)
                })
                .catch(err => {
                    console.error('Error search users', err)
                })

            return usersReceived
        }
    })
    done();
}

const getUserById = async (fastify, opt, done) => {
    fastify.get("/:id", () => {
    })
    return { hello: 'world' }

}

const RegisterNewUser = async (fastify, opt, done) => {
    fastify.get("/register", () => {

        try {


        } catch (error) {

        }

    })
    done()
    return { hello: 'world' }

}


const updateUserById = async (fastify, opt, done) => {
    fastify.get("/update", () => {
        try {


        } catch (error) {

        }

    })
    done()
    return { hello: 'world' }

}


const deleteUserById = async (fastify, opt, done) => {
    fastify.get("/delete", () => {
        try {


        } catch (error) {

        }

    })
    done()
    return { hello: 'world' }

}


export { listUsers, getUserById, RegisterNewUser, updateUserById, deleteUserById }


