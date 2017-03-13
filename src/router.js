/**
 * @file 路径
 * @author xiaowu
 * @email fe.xiaowu@gmail.com
 */

'use strict';

import express from 'express';
import fs from 'fs';
import md5 from 'MD5';
import path from 'path';
import URL from 'url';
import Mock from 'mockjs';
import marked from 'marked';

import template from './template';
import pkg from '../package.json';
import tips from './tips';
import Util from './util';

let app;

/* eslint-disable fecs-camelcase */
/* eslint-disable camelcase */
let router = express.Router();
/* eslint-enable fecs-camelcase */
/* eslint-enable camelcase */

router.get('/api/group', (req, res, next) => {
    res.json({
        ok: 1,
        config: app.config()
    });
});

export default {
    install(context) {
        app = context;
        app.express.use(app.config('admin'), router);
    }
};
