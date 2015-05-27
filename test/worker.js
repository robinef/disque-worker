'use strict';

var Worker = require('../');

var test = new Worker('test', '127.0.0.1', 7711);



test.getJob('queue2', 1, function(res){
  console.log('Hi from callback '+res);
});
