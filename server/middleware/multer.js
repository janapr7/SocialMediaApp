const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, `${__dirname}/../public/media/profile`);
    },
    filename: (req, file, cb)=>{
        cb(
            null,
            'PIMG' +
            '-' +
            Date.now() +
            Math.round(Math.random() * 1000000000) +
            '.' +
            file.mimetype.split('/')[1],
        );
    }
});

const limits = {
    fileSize: 1000000
}

const fileFilter = (req, file, cb)=>{
    if(file.mimetype.split('/')[1] === 'jpg' || file.mimetype.split('/')[1] === 'jpeg' || file.mimetype.split('/')[1] === 'png' || file.mimetype.split('/')[1] === 'gif'){
        cb(null, true);
    }else{
        cb(`File type not allowed`, false);
    }
};

exports.multerUpload = multer({storage, limits, fileFilter})
