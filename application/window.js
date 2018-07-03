const ejs = require('../base/EasyScript');
const {app} = require('electron');
module.exports = function (key, data, callback) {
    switch (key) {
        case 'mainMin': {
            ejs.getGlobal('mainWin').minimize(true);
            break;
        }
        case 'mainMax': {
            ejs.getGlobal('mainWin').maximize(true);
            break;
        }
        case 'mainUnMax': {
            ejs.getGlobal('mainWin').unmaximize(false);
            break;
        }
        case 'close': {
            app.quit();
            break;
        }
    }
};