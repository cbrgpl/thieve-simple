const $consts = require( '../consts' )

function parseGETurl( url ) {
  let baseURL = url.match( /.+?(?=\?)/ )

  if ( baseURL === null ) {
    return {
      endpoint: url,
      queryParams: {}
    }
  }

  baseURL = baseURL[ 0 ]
  const queryParamsStringsArray = url.slice( baseURL.length + 1 ).split( '&' )
  const queryParams = {}

  for ( let i = 0; i < queryParamsStringsArray.length; i += 1 ) {
    const keyValue = queryParamsStringsArray[ i ].split( '=' )
    queryParams[ keyValue[ 0 ] ] = keyValue[ 1 ]
  }

  return {
    endpoint: baseURL,
    queryParams
  }
}

class Router {
  constructor() {
    this.$routes = {}
  }

  appendRoute( endpoint, handlerCallback ) {
    this.$routes[ endpoint ] = handlerCallback
  }

  searchRoute( endpoint ) {
    let baseURL = endpoint.match( /.+?(?=\?)/ )
    baseURL = baseURL ? baseURL[ 0 ] : endpoint

    console.log( baseURL )

    for ( const route of Object.keys( this.$routes ) ) {
      if ( route === baseURL ) {
        return true
      }
    }

    return false
  }

  handleGETRequest( request, response ) {
    const { endpoint, queryParams } = parseGETurl( request.url )

    this.$routes[ endpoint ]( response, queryParams )
  }

  handlePOSTRequest( request, response ) {
    // I do not need it yet
  }

  handleRequest( request, response ) {
    const { method } = request

    if ( !this.searchRoute( request.url ) ) {
      throw new Error( 'There is no such endpoint' )
    }

    if ( method === $consts.method.GET ) {
      this.handleGETRequest( request, response )
    } else if ( method === $consts.method.POST ) {
      this.handlePOSTRequst( request, response )
    } else {
      throw new Error( 'Unacceptable method' )
    }
  }
}

module.exports = new Router()
