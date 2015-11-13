/**
 * @file 升级
 * @author xiaowu
 * @email fe.xiaowu@gmail.com
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

// let app;

/* eslint-disable fecs-camelcase */

/* eslint-disable camelcase */
var router = _express2['default'].outer();

/* eslint-enable fecs-camelcase */

/* eslint-enable camelcase */

/**
 * 2.0.3升级3.0.0
 */
router.get('/', function (req, res, next) {});

// router.setApp = (data) => {
//     app = data;
// };

exports['default'] = router;
module.exports = exports['default'];