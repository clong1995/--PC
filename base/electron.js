const {app, BrowserWindow, ipcMain} = require('electron');
const crypto = require('crypto');
const ejs = require('./EasyScript');
// 当所有的窗口被关闭后退出应用
app.on('window-all-closed', () => app.quit());

module.exports = {
    /**
     * 加载完成
     * @param callback
     * @returns {*}
     */
    ready: callback => app.on('ready', () => callback()),

    /**
     * 监听最大化
     * @param callback
     * @returns {*}
     */
    //max:callback => app.on('maximize',()=>callback()),

    /**
     * 创建窗口
     * @param url
     * @param opt
     */
    window: (url = 'http://127.0.0.1', opt = {}, callback) => {
        let win = new BrowserWindow(ejs.assignDeep({
            show: false,
            width: 1024,
            height: 768
        }, opt));
        win.loadURL(url);
        win.once('ready-to-show', () => {
            if (opt.max)
                win.maximize();
            else
                win.show();
            callback(win);
        });
        return win;
    },

    /**
     * ipc通讯
     * @param ipcToken
     */
    ipc: (ipcToken = 'ipc-token') => {
        ipcMain.on(ipcToken, (event, route, data = '{}') => {
            let r = route.split('/');
            let md5 = crypto.createHash('md5');
            md5.update(route + data);
            let key = md5.digest('hex').toUpperCase();
            try {
                require('../application/' + r[0])(r[1], JSON.parse(data), res => {
                    event.sender.send(ipcToken, key, JSON.stringify({state: 'succ', data: res}));
                });
            } catch (e) {
                event.sender.send(ipcToken, key, JSON.stringify({state: 'err', msg: e}));
            }
        });
    }
};