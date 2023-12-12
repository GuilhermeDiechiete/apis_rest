const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

require('./database/connection');
const userRoutes = require('./routes/user.routes');

const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use('/users', userRoutes);

server.listen(4000, () => console.log('Server running....'));
