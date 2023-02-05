const http = require('http');

const {reqRoutes, users} = require('./routes')

const server = http.createServer(reqRoutes);

server.listen(3000, ()=>{
    console.log("server is listening on port 3000");
})