const validateCredentials = async (fastify, opt, done) => {
    fastify.get("/grant-access", () => {
    })
    done()
    return { hello: 'world' }

}

const createNewSession = async (fastify, opt, done) => {
    fastify.get("/session", () => {
    })
    done()
    return { hello: 'world' }

}


const expireSession = async (fastify, opt, done) => {
    fastify.get("/expire", () => {
    })
    done()
    return { hello: 'world' }

}



export { validateCredentials, createNewSession, expireSession }

