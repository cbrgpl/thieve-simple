const http = require( 'http' )

const port = process.env.PORT || 3000
const router = require( './src/routes/router' )
const routes = require( './src/routes/routes' )

global.__basedir = __dirname

const server = http.createServer( ( request, response ) => {
  router.handleRequest( request, response )
} )

server.listen( port, () => {
  for ( const route of Object.keys( routes ) ) {
    router.appendRoute( route, routes[ route ] )
  }

  console.log( 'Server started listenning!' )
} )
