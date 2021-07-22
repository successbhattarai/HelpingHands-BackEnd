const express = require('express'); //Third Party
const bodyParser = require('body-parser'); // Core Module
const app = express();
const path = require('path');
const cors = require('cors');
const static_path = path.join(__dirname,'');

// Connect to mongoDB database
require('dotenv').config();
require("./db/db");

const userRoutes = require('./routes/user');
const contactRoutes = require('./routes/contact');
const volunteerRoutes = require('./routes/volunteer');
const blogRoutes = require('./routes/blog');
const campaignRoutes = require('./routes/campaign');
const eventRoutes = require('./routes/event');
app.use(express.static(static_path))
app.use(express.json())
app.use(cors());
app.use(userRoutes);
app.use(contactRoutes);
app.use(volunteerRoutes);
app.use(blogRoutes);
app.use(eventRoutes);
app.use(campaignRoutes);
app.use(bodyParser.urlencoded({extended:false}));

const port = process.env.PORT;
app.listen(port,() => {
     console.log(`Server is running on Port No. ${port}`)
});