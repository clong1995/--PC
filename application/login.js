const
    ejs = require('../base/EasyScript'),
    elc = require('../base/electron');
module.exports = function (key, data, callback) {
    switch (key) {
        case 'login': {
            elc.window(ejs.getGlobal('render') + 'index', {
                width: 1280,
                height: 768,
                resizable: true,
                frame: false,
                minWidth:930,
                minHeight:600
            },e=>{
                //销毁登录
                ejs.getGlobal('loginWin').close();
                ejs.delGlobal('loginWin');
                ejs.setGlobal('mainWin', e);
            });
            break;
        }
        case 'logout': {
            break;
        }
    }
};