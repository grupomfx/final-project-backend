
import { searchUsers, searchUserLikeName, searchUserById, insertNewUser, updateUserById } from "../../repositories/user.repository.js"

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
            await searchUsers()
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


const searchLikeUserbyName = async (fastify, opt, done) => {
    fastify.route({
        url: '/filter',
        method: ['GET'],
        schema: {
            summary: 'Get users data',
            description: 'Return a given users data by name',
            tags: ['User'],
            querystring: {
                type: 'object',
                properties: {
                    searchLike: { type: 'string', description: 'search user like by name' }
                },
            },
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
            const { searchLike } = request.query
            let usersReceived = { users: [] }
            await searchUserLikeName(searchLike)
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
    fastify.route({
        url: '/',
        method: ['GET'],
        schema: {
            summary: 'Get user data',
            description: 'Return a given user data',
            tags: ['User'],
            querystring: {
                type: 'object',
                properties: {
                    userId: { type: 'string', description: 'search user by userId' }
                },
            },
            response: {
                200: {
                    description: 'Return user model',
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        email: { type: 'string' }
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
            const { userId } = request.query;
            let userReceived = null
            await searchUserById(userId)
                .then(userFind => {
                    userReceived = userFind
                })
                .catch(err => {
                    console.error('Error search user', err)
                })

            return userReceived
        }
    })
    done();
}

const RegisterNewUser = async (fastify, opt, done) => {
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            summary: 'Create new user',
            description: 'Create a new user data',
            tags: ['User'],
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: 'User name' },
                    email: { type: 'string', description: 'User email' }
                },
                required: ['name', 'email']
            },
            response: {
                201: {
                    description: 'User created successfully',
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        email: { type: 'string' }
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
                const { name, email } = request.body;
                const user = { name, email }
                console.log(user)
                let response = null
                await insertNewUser(user)
                    .then(insertedUser => {
                        response = insertedUser
                    })
                    .catch(err => {
                        console.error('Error search user', err)
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

const updateUser = async (fastify, opt, done) => {
    fastify.route({
        method: 'PUT',
        url: '/',
        schema: {
            summary: 'Update existing user',
            description: 'Create a new user data',
            tags: ['User'],
            querystring: {
                type: 'object',
                properties: {
                    userId: { type: 'string', description: 'userId for update' }
                },
            },
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: 'User name' },
                    email: { type: 'string', description: 'User email' }
                },
                required: ['name', 'email']
            },
            response: {
                201: {
                    description: 'User created successfully',
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        email: { type: 'string' }
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
                const { name, email } = request.body;
                const { userId } = request.query
                const userData = { name, email }

                let response = null
                await updateUserById(userId, userData)
                    .then(updatedUser => {
                        response = updatedUser
                    })
                    .catch(err => {
                        console.error('Error search user', err)
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


const deleteUserById = async (fastify, opt, done) => {
    fastify.get("/delete", () => {
        try {


        } catch (error) {

        }

    })
    done()
    return { hello: 'world' }

}


export { listUsers, getUserById, RegisterNewUser, updateUser, deleteUserById, searchLikeUserbyName }


