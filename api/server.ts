const fastify = require('fastify');
//const path = require('./routes');

const server = fastify();

//handles GET / request
server.get('/', async (request, reply) => {
  try {
    return {message : "hello, world!"}
  }
  catch (e) { console.log(e) }
});

//iterating over all the routes and registering them with fastify
// routes.forEach(route => server.route(route))

//launching server at port : 3000 in local environment
server.listen(process.env.PORT || 3010, '0.0.0.0', (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`server running at ${server.server.address()}`)
})
