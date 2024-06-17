const listProducts = async (fastify, opt, done) => {
    fastify.get("/list", () => {
        try {


        } catch (error) {

        }

    })
    done()
    return { hello: 'world' }

}

const getProductById = async (fastify, opt, done) => {
    fastify.get("/:id", () => {
        try {


        } catch (error) {

        }

    })
    done()
    return { hello: 'world' }

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


export { listProducts, getProductById, RegisterNewProduct, updateProductById, deleteProductById }





