const fsPromises = require( 'fs/promises' )

module.exports = async function ( imagesVaultPath, imagesNumber ) {
  const imagesList = await fsPromises.readdir( imagesVaultPath )
  const randomImagesIndexes = []

  // because i need unique indexes
  for ( let i = 0; i < imagesNumber; i += 1 ) {
    const rand = Math.floor( Math.random() * ( imagesList.length - 1 ) )

    if ( randomImagesIndexes.includes( rand ) ) {
      i -= 1
    } else {
      randomImagesIndexes.push( rand )
    }
  }

  return randomImagesIndexes.reduce( ( accumulator, index ) => {
    accumulator.push( imagesList[ index ] )
    return accumulator
  }, [] )
}
