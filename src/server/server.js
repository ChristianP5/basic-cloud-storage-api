const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config();

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost'
    });

    server.route(routes); 

    server.ext('onPreResponse', (request, h)=>{
        const response = request.response;

        if(response instanceof Error){
            console.log(response.stack);
        }
        
        return h.continue;
    })

    await server.register([
        {
            plugin: require('@hapi/inert')
        }
    ])

    await server.start();
    console.log(`Server started at ${server.info.uri}`);
}

init();