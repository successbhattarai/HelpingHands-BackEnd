const multer = require('multer');

const BlogImage =multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./images/blog')
    },
    filename : function(req,file,cb){
        let currentDate = new Date(Date.now()).toDateString().replace(/ /g,"_");
        const uniqueSuffix = currentDate + '_IMG_' + Math.round(Math.random() * 1E9)
        console.log(uniqueSuffix);
        cb(null, uniqueSuffix + ".jpeg")
    }
});

const imageFilter=((req,file,cb)=>{
    if(file.mimetype=="image/jpeg" || file.mimetype=="image/png"){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
})

const blog = multer({
    storage : BlogImage
});


module.exports = blog;