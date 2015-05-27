'use strict';

var Worker = require('../');

var test = new Worker('test', '127.0.0.1', 7711);
test.addJob('queue2','data', 0);
test.getJob('queue2');
