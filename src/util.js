/**
 * @file 常用方法
 * @author xiaowu
 * @email fe.xiaowu@gmail.com
 */

let util = {};

/**
 * 解析字符串为json
 *
 * @param  {string}   str 字符串
 *
 * @return {Object}       json对象
 */
util.parseJSON = (str = '') => {

    /* eslint-disable fecs-no-eval */
    /* eslint-disable no-eval */
    return eval('(' + str + ')');
    /* eslint-enable fecs-no-eval */
    /* eslint-enable no-eval */
    // return new Function('return ' + str)();
};

export default util;
