const
    ejs = require('../base/EasyScript'),
    elc = require('../base/electron');
module.exports = function (key, data, callback) {
    switch (key) {
        case 'main': {
            elc.window(ejs.getGlobal('render') + 'index', {
                width: 1280,
                height: 768,
                resizable: true,
                frame: false,
                minWidth: 1024,
                minHeight: 633,
                maxWidth: 1920,
                maxHeight: 1080
            }, win => ejs.setGlobal('mainWin', win));

            //销毁登录
            ejs.getGlobal('loginWin').close();
            ejs.delGlobal('loginWin');
            break;
        }

        case 'error':{
            elc.send(ejs.getGlobal('loginWin'),'loginError',data);
        }
    }
};