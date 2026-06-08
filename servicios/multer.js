const multer = require('multer');

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(
            null,
            'public/imagenes'
        );

    },

    filename:(req,file,cb)=>{

        const nombre =

            Date.now()

            +

            '-'

            +

            file.originalname
                .toLowerCase()
                .replace(/\s+/g,'_');

        cb(
            null,
            nombre
        );

    }

});

module.exports = multer({
    storage
});