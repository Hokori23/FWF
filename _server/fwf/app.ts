import { Applier as ApplierRouter } from '@routes';

import {
  SkipOptions,
  LoggerStart,
  LoggerMiddle,
  LoggerEnd
} from './middleware';

const EXPRESS = require('express');

const APP = EXPRESS();

// parse application/x-www-form-urlencoded
APP.use(EXPRESS.urlencoded({ extended: true }));
// parse application/json
APP.use(EXPRESS.json());

// 中间件
APP.use(SkipOptions);
APP.use(LoggerStart);
APP.use(LoggerMiddle); // 如果JWTFilter已给出响应，整个中间件链在此提前结束

APP.use('/api', ApplierRouter);

// 中间件
APP.use(LoggerEnd);

module.exports = APP;
