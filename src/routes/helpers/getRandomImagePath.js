const fsPromises = require( 'fs/promises' )

module.exports = async function () {
  const files = await fsPromises.readdir( `${__basedir}/src/images` )
  const rand = Math.floor( Math.random() * ( files.length - 1 ) )
  return `${__basedir}/src/images/${files[ rand ]}`
}
