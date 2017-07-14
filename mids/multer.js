/* multer中间件 */

var multer = require('multer'),
    uploadFolder = 'uploads/',
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
        },
        filename: function (req, file, cb) {
            /* 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
            通过file.mimetype给文件加后缀，因为默认情况下是没有后缀名的
            */
            var type_name='';
            switch(file.mimetype){
                case 'image/jpeg':
                    type_name='.jpg';
                    break;
                case 'image/png':
                    type_name='.png';
                    break;
                default:
                    type_name=''
            }
            cb(null, file.fieldname + '-' + Date.now()+type_name);  
        }
    }),
    upload = multer({ storage: storage });

module.exports=upload;