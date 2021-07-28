const express = require('express'); //Third Party
const bodyParser = require('body-parser'); // Core Module
const connectDB = require("./db/db");
const app = express();
const path = require('path');
const cors = require('cors');
const static_path = path.join(__dirname,'');

// Connect to mongoDB database
const  env = require('dotenv');
env.config({
     path:"./env"
}  
);

connectDB();

const userRoutes = require('./routes/user');
const contactRoutes = require('./routes/contact');
const volunteerRoutes = require('./routes/volunteer');
const blogRoutes = require('./routes/blog');
const campaignRoutes = require('./routes/campaign');
const eventRoutes = require('./routes/event');
const donationRoutes = require('./routes/donation');
app.use(express.static(static_path))
app.use(express.json())
app.use(cors());
app.use(userRoutes);
app.use(contactRoutes);
app.use(volunteerRoutes);
app.use(blogRoutes);
app.use(eventRoutes);
app.use(campaignRoutes);
app.use(donationRoutes);
app.use(bodyParser.urlencoded({extended:false}));

app.get("/", (req, res)=>{
     res.send("Welcome to helping hands");
})
const PORT = process.env.PORT || 9000;
app.listen(PORT);