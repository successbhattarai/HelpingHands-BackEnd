
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
 const blog = {
 'blogImage': '',
 'blogTitle': 'abc',
 'blogDescription': 'dfghjkl',
 'blogDetail': 'test3sdfghjkl',
 'blogTags': 'test4dfghjkl;',
 'blogPostedBy': 'test',
 'blogPostDate': '202145;',
 }


 
//  return blog.create(blog)
//  .then((pro_ret) => {
//  expect(pro_ret.blogDescription).toEqual('dfghjkl');
//  });
 });

 it("to find something", () => {
     const blog = {
         'blogdescription' : 'dfghjkl',
     };
 })
})