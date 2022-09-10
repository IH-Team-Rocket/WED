const mongoose = require('mongoose');
const Gift = require('../models/Gift.model');
const GIFTS = require('../data/gifts.json')
// Conectarme a la base de datos

require('../config/db.config');

mongoose.connection.once('open', () => {
  mongoose.connection.db.dropDatabase()
    .then(() => {
      console.info('Db dropped')
      return Gift.create(GIFTS)
    })
    .then(createdGifts => {
      createdGifts.forEach(gift => console.log(`${gift.name} was created`))

      // Cerrar la conexion
      return mongoose.connection.close()
    })
    .then(() => {
      console.log('Connection closed')
      process.exit(1)
    })
    .catch(err => {
      console.error(err)
      process.exit(0)
    })
})