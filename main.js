const ejs = require('./base/EasyScript');
const elc = require('./base/electron');
//const db = require('./base/DataBase.class');
e
ejs.setGlobal('render', 'https://weixin.cxdgtm.com/pc/');

elc.ready(() => {




        elc.window(ejs.getGlobal('render') + 'login',{
            width: 280,
            height: 400,
            frame: false,
            resizable: false,
            alwaysOnTop:true
        },e =>{
            ejs.setGlobal('loginWin', e);
        });











    }
);

elc.ipc();