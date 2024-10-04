const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createConnection } = require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { readdirSync } = require('fs');
const app = express();
const path = require('path');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware function to handle CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));

// Auto-load routes from the 'Routes' directory
readdirSync('./Routes')
    .map((b) => app.use('/admin', require('./Routes/' + b)));

// Route for rendering index.ejs
app.get('/', (req, res) => {
    res.render('index'); // Assuming 'index.ejs' is in your views directory
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
