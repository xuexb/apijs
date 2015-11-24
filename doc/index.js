'use strict';

var Mdjs = require('mdjs');
var child_process = require('child_process');

var app = new Mdjs({
    "port": 8002,
    "root": "../",
    "cache_path": "../__cache/",
    "name": "apijs",
    "dir_alias": {
        "doc": "文档yxds"
    }
});

// 更新勾子
app.express.post('/api/update', function (req, res, next) {
    child_process.exec('pwd && git pull', {
        cwd: app.options.root + '/doc/'
    }, function (a, b) {
        console.log('更新成功', b);

        // 清空缓存
        app.clear_cache();

        console.log('clear_cache');

        // 重启pm2，重启是为了让配置生效
        child_process.exec('npm run restart', {
            cwd: app.options.root + '/doc/'
        }, function(){
            console.log('npm run restart');
        });
    });

    res.end('ok');
});