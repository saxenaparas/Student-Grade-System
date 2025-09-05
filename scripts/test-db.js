require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
console.log('Using:', uri ? 'MONGODB_URI set' : 'MONGODB_URI NOT set');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connected');
    process.exit(0);
  })
  .catch((e) => {
    console.error('DB connect error', e);
    process.exit(1);
  });
