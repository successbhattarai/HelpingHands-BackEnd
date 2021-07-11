const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/HelpingHands',{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() =>{
		console.log("MongoDB Connected");
	})
	.catch((e) => {
		console.log("MongoDB Connection Failed");
}); 	

