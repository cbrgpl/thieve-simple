const getRandomImagePath = require( './helpers/getRandomImagePath' )
const getImage = require( './helpers/getImage' )
const getImageNamesList = require( './helpers/getImagesList' )

module.exports = {
  '/': ( res ) => {
    res.statusCode = 200
    res.setHeader( 'Content-Type', 'text/html' )
    res.end( 'ok' )
  },
  '/get-random-local-image': async ( res ) => {
    const filePath = await getRandomImagePath()
    const fileBuffer = await getImage( filePath )

    res.writeHead( 200, { 'Content-Type': 'image/jpg' } )
    res.end( fileBuffer )
  },
  '/get-images-names': async ( res, { number } ) => {
    const imagesList = await getImageNamesList( `${__basedir}/src/images`, number || 3 )

    res
      .writeHead( 200, { 'Content-Type': 'application/json' } )
      .end( JSON.stringify( imagesList ) )
  },
  '/get-image-by-name': async ( res, { name } ) => {
    const imageBuffer = await getImage( `${__basedir}/src/images/${name}` )

    res.writeHead( 200, { 'Content-Type': 'image/jpg' } )
    res.end( imageBuffer )
  }
}
