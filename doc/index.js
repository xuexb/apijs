'use strict';

var Mdjs = require('mdjs');

var app = new Mdjs({
    "port": 8002,
    "root": "../",
    "cache_path": "../__cache/",
    "name": "apijs",
    "dir_alias": {
        "doc": "文档"
    }
});

// 更新勾子
app.express.post('/api/update', function (req, res, next) {
    child_process.exec('git pull', {
        cwd: app.options.root
    }, function (a, b) {
        // 清空缓存
        app.clear_cache();

        // 重启pm2，重启是为了让配置生效
        child_process.exec('pm2 restart index.js', {
            cwd: app.options.root
        });
    });

    res.end('ok');
});