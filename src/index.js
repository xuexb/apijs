/**
 * @file 主文件
 * @author xiaowu
 * @email fe.xiaowu@gmail.com
 */

'use strict';

import extend from 'extend';
import path from 'path';
import fs from 'fs';
import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';

import admin from '../../apijs-admin';

import pkg from '../package.json';
import config from './config';
import router from './router';
import template from './template';
import Util from './util';

export default class Apijs {
    constructor(options = {}) {
        // 合并配置
        this.__config = extend(true, {}, config, options);

        // 转换路径为绝对路径
        this._resolvePath();

        this._init();
    }

    /**
     * 初始化
     *
     * @private
     */
    _init() {
        let config = this.config();
        let app = this.express = express();

        // 配置json
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(bodyParser.json());

        // 添加响应头
        app.use((req, res, next) => {
            res.append('by-' + pkg.name, pkg.version);
            next();
        });

        // 安装路由
        router.install(this);

        // 配置静态后台静态代理到包目录里的apijs-admin里
        app.use(this.config('admin'), serveStatic(this.config('path.admin.static')));
    }

    /**
     * 运行
     *
     * @return {Object}  this
     */
    run() {
        this.express.listen(this.config('port'));

        return this;
    }

    /**
     * 转换配置的路径
     *
     * @private
     */
    _resolvePath() {
        this.config('path.base', path.resolve('./', this.config('base')));
        this.config('path.admin', admin.getPath());
        this.config('path.admin.static', admin.getPath('static'));
        this.config('path.cache', path.resolve('./', this.config('cachePath')));

        console.log('config', this.config())
    }

    /**
     * 简单的配置
     *
     * @date   2015-11-08
     *
     * @param  {string|undefined}   key 配置的key
     * @param  {string|null}   val 配置的val
     *
     * @return {Object}       配置
     *
     * @example
     *     1. 获取全部配置: config()
     *     2. 获取配置key: config('key');
     *     3. 设置配置key: config('key', 'val');
     *     4. 删除配置key: config('key', null);
     */
    config(key = '', val = '') {
        if (key === '') {
            return this.__config;
        }
        else if (val === '') {
            return this.__config[key];
        }
        else if (val === null) {
            delete this.__config[key];
        }
        else {
            this.__config[key] = val;
        }
        return this;
    }
}
