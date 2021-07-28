const mongoose = require('mongoose');
 mongoose.Promise=global.Promise;
 const connectDB = async () =>{
	 const coll = await mongoose.connect(
		 "mongodb+srv://admin:admin@helpinghands.mfykl.mongodb.net/helpinghands?retryWrites=true&w=majority" || 'mongodb://localhost:27017/helpinghands',
		 {

			useNewUrlParser: true,
	  
			useCreateIndex: true,
	  
			useFindAndModify: false,
	  
			useUnifiedTopology: true,
	  
		  }
		 );
		 console.log(`MongoDB connected to : ${coll.connection.host}`);
 };
 module.exports = connectDB;