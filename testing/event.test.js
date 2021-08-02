
const user = require('../models/user');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/HelpingHands-BackEnd';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useCreateIndex: true
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});
describe('testing the blog page', () => {
// the code below is for insert testing
 it('Add blog testing anything', () => {
 const event = {
 'eventImage': '',
 'eventName': 'test',
 'eventShortDescription': 'test1test2test3',
 'eventAttendees': 'testt',
 'eventDate': '12/01/2021', 
 'eventMonth': 'december',
 'eventYear': '2021',
 'eventCategories': 'test1',
 'eventLocation': 'basantapur',
 'eventFullDescription': 'testetsttses;',
'eventPostedBy': 'dilip',
'eventPostDtae': "20202547",
 
}

 });

 it("contact test anything", () => {
     const event = {
         'eventName' : 'test',
         'eventAttendees' : 'testt'
     };
 })
})