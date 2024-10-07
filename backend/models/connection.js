const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));
conn.once('open', () => console.info('Connection to db is successfull'))

module.exports = conn;