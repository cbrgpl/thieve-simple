const fsPromises = require( 'fs/promises' )

module.exports = async function ( imagePath ) {
  const fileBuffer = await fsPromises.readFile( imagePath )

  return fileBuffer
}
