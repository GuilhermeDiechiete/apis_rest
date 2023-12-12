const express = require('express');
const cors = require('cors');

const server = express();
const bodyParser = require('body-parser');

require('dotenv').config();
require('./database/connection');

const userRoutes = require('./routes/userRoutes');

server.use(bodyParser.json());
server.use(cors());
server.use('/user', userRoutes);

server.listen(process.env.PORT, () => console.log('Server running'));
