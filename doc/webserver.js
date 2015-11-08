'use strict';

var Docjs = require('../../docjs/index');

var app = new Docjs({
    name: 'apijs',
    root: '../',
    port: 8002,
    mapPath: './webserver.json'
});

app.run();
