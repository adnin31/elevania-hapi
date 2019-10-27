'use strict';
const Hapi = require('@hapi/hapi');
const sequlize = require('./config/sequelize-setup.js')
const Routes = require('./routes/index.js')

const init = async () => {
    await sequlize.authenticate().then(() =>{
        console.log('Connection success')
    })

    const server = Hapi.server({
        port: 3030,
        host: 'localhost'
    });
    const router = new Routes(server)

    router.getProducts();
    router.addProducts();
    router.updateProducts();
    router.deleteProducts();

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();