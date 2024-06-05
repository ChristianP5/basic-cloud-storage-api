const {
    postUploadHandler,
} = require('./handler');

const routes = [
    {
        path: '/upload',
        method: 'POST',
        handler: postUploadHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                
                // Usable only when using the Inert Plugin
                output: 'file'
            }
        }
    }
]


module.exports = routes;