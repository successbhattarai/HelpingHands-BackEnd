const express = require('express'); //Third Party
const bodyParser = require('body-parser'); // Core Module
const app = express();
const port = process.env.PORT || 9000;
const path = require('path');
const cors = require('cors');
const static_path = path.join(__dirname,'');

// Connect to mongoDB database
const connectDB = require('./db/db');

const user_routes = require('./routes/user');
app.use(express.static(static_path))
app.use(express.json())
app.use(cors());
app.use(user_routes);
app.use(bodyParser.urlencoded({extended:false}));

app.listen(port,() => {
     console.log(`Activated Port No. ${port}`)
});