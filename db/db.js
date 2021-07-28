const mongoose = require('mongoose');
 mongoose.Promise=global.Promise;
 const connectdb = async () =>{
	 const coll = await mongoose.connect(
		 process.env.MONGO_URI || 'mongodb://localhost:27017/helpinghands',
		 {

			useNewUrlParser: true,
	  
			useCreateIndex: true,
	  
			useFindAndModify: false,
	  
			useUnifiedTopology: true,
	  
		  }
		 )
 };